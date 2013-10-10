goog.provide("rokko.managers.EntityManager");

/**
 *
 * @constructor
 */
rokko.managers.EntityManager = function() {
   /** @private */
   this.entities = {};
};

/**
 *
 * Add one or more entities to the manager
 *
 * @param {rokko.entities.Entity|Array.<rokko.entities.Entity>} entity
 * @param {string} group
 */
rokko.managers.EntityManager.prototype.add = function(entity, group) {
   if (!goog.isArray(entity)) {
      entity = [entity];
   }

   this.entities[group] = this.entities[group] || [];

   for (var i = 0, len = entity.length; i < len; i++) {
      this.entities[group].push(entity[i]);
   }
};

/**
 *
 * Remove a single entity from the manager
 *
 * @param {rokko.entities.Entity} entity
 * @param {string} group
 */
rokko.managers.EntityManager.prototype.remove = function(entity, group) {
   if (goog.isArray(this.entities[group])) {
      var group = this.entities[group];
      var entityIndex = -1;

      for (var i = 0, len = group.length; i < len; i++) {
         if (entity.getId() == group[i].getId()) {
            // Cache the index to be removed to avoid changing the array while iterating over it
            entityIndex = i;
            break;
         }
      }

      if (entityIndex >= 0) {
         group.splice(entityIndex, 1);
         return true;
      }
   }

   return false;
};