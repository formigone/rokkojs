goog.provide("rokko.components.Component");

/**
 *
 * @constructor
 */
rokko.components.Component = function (options) {
   options = options || {};

   if (goog.isDefAndNotNull(options.onInit) && goog.isFunction(options.onInit)) {
      this.init = options.onInit;
   }

   if (goog.isDefAndNotNull(options.onExec) && goog.isFunction(options.onExec)) {
      this.exec = options.onExec;
   }

   this.init();
};

/**
 *
 * @param {rokko.components.Component} self
 * @param {rokko.entities.Entity} entity
 */
rokko.components.Component.prototype.exec = function (entity) {
};

/** @type {string} */
rokko.components.Component.prototype.ID = "__ROKKO_COMPONENT__";

/**
 * Allow for custom initialization
 */
rokko.components.Component.prototype.init = function () {
};