// This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // Contact Model
  // ----------

  // Our basic **Contact** model has `title`, `order`, and `done` attributes.
  var Contact = Backbone.Model.extend({

    // Default attributes for the contact item.
    defaults: function() {
      return {
        title: "empty contact...",
	email: "empty email...",
	mobile: "empty mobile...",
        order: Contacts.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this contact item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Contact Collection
  // ---------------

  // The collection of contacts is backed by *localStorage* instead of a remote
  // server.
  var ContactList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Contact,

    // Save all of the contact items under the `"contacts-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("contacts-backbone"),

    // We keep the Contacts in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Contacts are sorted by their original insertion order.
    comparator: 'order'

  });

  // Create our global collection of **Contacts**.
  var Contacts = new ContactList;

  // Contact Item View
  // --------------

  // The DOM element for a contact item...
  var ContactView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "click #updtBt"      : "close"
    },

    // The ContactView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Contact** and a **ContactView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // Re-render the titles of the contact item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
	$("li.editing").removeClass("editing");	
      this.$el.addClass("editing");
    },

    // Close the `"editing"` mode, saving changes to the contact.
    close: function() {
	this.model.save({title:  $(".editing #title").val(),email:$(".editing #email").val(),mobile:$(".editing #mobile").val()});
        this.$el.removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#contactManagerApp"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
     
      "click #addBtn": "addContact"
    },

    // At initialization we bind to the relevant events on the `Contacts`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting contacts that might be saved in *localStorage*.
    initialize: function() {

      this.listenTo(Contacts, 'add', this.addOne);
      this.listenTo(Contacts, 'reset', this.addAll);
      this.listenTo(Contacts, 'all', this.render);
      this.main = $('#main');
      Contacts.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
 
      if (Contacts.length) {
        this.main.show();
      } else {
        this.main.hide();
        }
    },

    // Add a single contact item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(contact) {
      var view = new ContactView({model: contact});
      this.$("#contact-list").append(view.render().el);
    },

    // Add all items in the **Contacts** collection at once.
    addAll: function() {
      Contacts.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Contact** model,
    // persisting it to *localStorage*.
     addContact : function(){
		if($("#titleText").val()){
			Contacts.create({title: $("#titleText").val(),email:  $("#emailText").val(),mobile:  $("#mobileText").val()});
			$("#titleText").val('');
			$("#emailText").val('');
			$("#mobileText").val('');
		}
	}

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
