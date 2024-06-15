"use strict";

const _ = require("lodash");

module.exports = (plugin) => {
  const getController = (name) => {
    return strapi.plugins["users-permissions"].controller(name);
  };

  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user;
    return sanitizedUser;
  };

  // Create the new controller
  plugin.controllers.user.updateMe = async (ctx) => {
    const user = ctx.state.user;

    // User has to be logged in to update themselves
    if (!user) {
      return ctx.unauthorized();
    }

    // Pick only specific fields for security
    const newData = _.pick(ctx.request.body, [
      "email",
      "username",
      "name",
      "phone",
      "currentPassword",
      "password",
      "confirmPassword",
    ]);

    // Make sure there is no duplicate user with the same username
    if (newData.username) {
      const userWithSameUsername = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { username: newData.username } });

      if (userWithSameUsername && userWithSameUsername.id != user.id) {
        return ctx.badRequest("Username already taken");
      }
    }
    if (newData.name) {
      const userWithSameName = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { name: newData.name } });

      if (userWithSameName && userWithSameName.id != user.id) {
        return ctx.badRequest("Name already taken");
      }
    }
    if (newData.phone) {
      const userWithSamePhone = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { phone: newData.phone } });

      if (userWithSamePhone && userWithSamePhone.id != user.id) {
        return ctx.badRequest("Phone number already taken");
      }
    }

    // Make sure there is no duplicate user with the same email
    if (newData.email) {
      const userWithSameEmail = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: newData.email.toLowerCase() } });

      if (userWithSameEmail && userWithSameEmail.id != user.id) {
        return ctx.badRequest("Email already taken");
      }
      newData.email = newData.email.toLowerCase();
    }

    // Check if user is changing password and make sure passwords match
    if (newData.password) {
      if (!newData.confirmPassword) {
        return ctx.badRequest("Missing password confirmation");
      } else if (newData.password !== newData.confirmPassword) {
        return ctx.badRequest("Passwords don't match");
      }

      // Validate the current password
      const validPassword = await strapi.plugins[
        "users-permissions"
      ].services.user.validatePassword(newData.currentPassword, user.password);

      if (!validPassword) {
        return ctx.badRequest("Current password is incorrect");
      }

      delete newData.confirmPassword;
      delete newData.currentPassword;
    }

    // Reconstruct context so we can pass to the controller
    ctx.request.body = newData;
    ctx.params = { id: user.id };

    // Update the user and return the sanitized data
    const updatedUser = await getController("user").update(ctx);

    // Populate the role
    const populatedUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      updatedUser.id,
      { populate: ["role"] }
    );

    ctx.body = sanitizeOutput(populatedUser);
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ["role"] }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      { ...ctx.params, populate: ["role"] }
    );

    ctx.body = users.map((user) => sanitizeOutput(user));
  };

  // Add the custom route
  plugin.routes["content-api"].routes.unshift({
    method: "PUT",
    path: "/users/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
    },
  });

  return plugin;
};
