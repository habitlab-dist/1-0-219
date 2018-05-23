(function(){
  var prelude, $, swal, load_css_file, ref$, get_enabled_goals, get_goals, set_goal_target, get_goal_target, remove_custom_goal_and_generated_interventions, add_enable_custom_goal_reduce_time_on_domain, set_goal_enabled_manual, set_goal_disabled_manual, get_interventions, get_enabled_interventions, set_intervention_disabled, enable_interventions_because_goal_was_enabled, get_baseline_time_on_domains, list_all_domains_in_history, add_log_interventions, url_to_domain, get_canonical_domain, get_favicon_data_for_domain_cached, promise_all_object, msg, polymer_ext;
  prelude = require('prelude-ls');
  $ = require('jquery');
  swal = require('sweetalert2');
  load_css_file = require('libs_common/content_script_utils').load_css_file;
  ref$ = require('libs_backend/goal_utils'), get_enabled_goals = ref$.get_enabled_goals, get_goals = ref$.get_goals, set_goal_target = ref$.set_goal_target, get_goal_target = ref$.get_goal_target, remove_custom_goal_and_generated_interventions = ref$.remove_custom_goal_and_generated_interventions, add_enable_custom_goal_reduce_time_on_domain = ref$.add_enable_custom_goal_reduce_time_on_domain, set_goal_enabled_manual = ref$.set_goal_enabled_manual, set_goal_disabled_manual = ref$.set_goal_disabled_manual;
  ref$ = require('libs_backend/intervention_utils'), get_interventions = ref$.get_interventions, get_enabled_interventions = ref$.get_enabled_interventions, set_intervention_disabled = ref$.set_intervention_disabled;
  enable_interventions_because_goal_was_enabled = require('libs_backend/intervention_manager').enable_interventions_because_goal_was_enabled;
  ref$ = require('libs_backend/history_utils'), get_baseline_time_on_domains = ref$.get_baseline_time_on_domains, list_all_domains_in_history = ref$.list_all_domains_in_history;
  add_log_interventions = require('libs_backend/log_utils').add_log_interventions;
  url_to_domain = require('libs_common/domain_utils').url_to_domain;
  get_canonical_domain = require('libs_backend/canonical_url_utils').get_canonical_domain;
  get_favicon_data_for_domain_cached = require('libs_backend/favicon_utils').get_favicon_data_for_domain_cached;
  promise_all_object = require('libs_common/promise_utils').promise_all_object;
  msg = require('libs_common/localization_utils').msg;
  polymer_ext = require('libs_frontend/polymer_utils').polymer_ext;
  polymer_ext({
    is: 'idea-generation-panel',
    properties: {
      index_background_color: {
        type: String,
        value: 'rgb(81, 167,249)'
      }
    },
    select_answer_leftside: function(evt){
      var self;
      self = this;
      if (this.animation_inprogress) {
        return;
      }
      this.SM('.animate_left').css("filter", "grayscale(0%)");
      this.SM('.animate_left').css("background-color", "#0000FF");
      this.$$('.animate_left').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-leftside-animate').css("margin-top", '0');
      this.SM('.answer-leftside-animate').css("z-index", '1');
      this.SM('.answer-leftside-fix').css("z-index", '0');
      this.SM('.answer-leftside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.SM('.animate_right').css("background-color", "#0000FF");
      this.SM('.animate_right').css("filter", "grayscale(30%)");
      this.$$('.animate_right').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-rightside-animate').css("margin-top", '0');
      this.SM('.answer-rightside-animate').css("z-index", '1');
      this.SM('.answer-rightside-fix').css("z-index", '0');
      this.SM('.answer-rightside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.animation_inprogress = true;
      return setTimeout(function(){
        return self.animation_inprogress = false;
      }, 1000);
    },
    select_answer_rightside: function(evt){
      var self;
      self = this;
      if (this.animation_inprogress) {
        return;
      }
      this.SM('.animate_right').css("filter", "grayscale(0%)");
      this.SM('.animate_right').css("background-color", "#0000FF");
      this.$$('.animate_right').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-rightside-animate').css("margin-top", '0');
      this.SM('.answer-rightside-animate').css("z-index", '1');
      this.SM('.answer-rightside-fix').css("z-index", '0');
      this.SM('.answer-rightside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.SM('.animate_left').css("background-color", "#0000FF");
      this.SM('.animate_left').css("filter", "grayscale(30%)");
      this.$$('.animate_left').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-leftside-animate').css("margin-top", '0');
      this.SM('.answer-leftside-animate').css("z-index", '1');
      this.SM('.answer-leftside-fix').css("z-index", '0');
      this.SM('.answer-leftside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.animation_inprogress = true;
      return setTimeout(function(){
        return self.animation_inprogress = false;
      }, 1000);
    },
    select_opt_out: function(evt){
      var self;
      console.log("cli!!");
      self = this;
      if (this.animation_inprogress) {
        return;
      }
      this.SM('.animate_right').css("filter", "grayscale(30%)");
      this.SM('.animate_right').css("background-color", "#0000FF");
      this.$$('.animate_right').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-rightside-animate').css("margin-top", '0');
      this.SM('.answer-rightside-animate').css("z-index", '1');
      this.SM('.answer-rightside-fix').css("z-index", '0');
      this.SM('.answer-rightside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.SM('.animate_left').css("filter", "grayscale(30%)");
      this.SM('.animate_left').css("background-color", "#0000FF");
      this.$$('.animate_left').innerText = msg('This message will be copied from fix button');
      this.SM('.answer-leftside-animate').css("margin-top", '0');
      this.SM('.answer-leftside-animate').css("z-index", '1');
      this.SM('.answer-leftside-fix').css("z-index", '0');
      this.SM('.answer-leftside-animate').animate({
        marginTop: '+120px'
      }, 1000);
      this.animation_inprogress = true;
      return setTimeout(function(){
        return self.animation_inprogress = false;
      }, 1000);
    }
  }, [
    {
      source: require('libs_common/localization_utils'),
      methods: ['msg']
    }, {
      source: require('libs_frontend/polymer_methods'),
      methods: ['text_if', 'once_available', 'S', 'SM']
    }, {
      source: require('libs_frontend/polymer_methods_resize'),
      methods: ['on_resize']
    }
  ]);
}).call(this);
