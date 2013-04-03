define('app/controllers/rules', [
    'app/models/rule',
    'ember',
    'jquery'
    ],
    /**
     *
     * Rules controller
     *
     * @returns Class
     */
    function(Rule) {
        return Ember.ArrayController.extend({

            metricList: ['load', 'cpu', 'ram', 'disk', 'network'],
            operatorList: [{'title': 'gt', 'symbol': '>'}, {'title': 'lt', 'symbol': '<'}],
            actionList: ['alert', 'reboot', 'destroy', 'launch', 'command'],

            init: function() {
                this._super();
                /*
                var that = this;

                $.getJSON('/keys', function(data) {
                    var content = new Array();
                    data.forEach(function(item){
                        content.push(Key.create(item));
                    });
                    that.set('content', content);
                }).error(function() {
                    Mist.notificationController.notify("Error loading keys");
                });
                */
            },

            newRule: function(machine, metric, operator, value, action) {
                item = {
                    'machine': machine,
                    'metric': metric,
                    'operator': operator,
                    'value': value,
                    'action': action
                }

                var rule = Rule.create(item);
                this.addObject(rule);
                /*
                var that = this;

                $.ajax({
                    url: 'rules/' + name,
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(item),
                    success: function(data) {
                        info('Successfully sent create key ', name);
                    },
                    error: function(jqXHR, textstate, errorThrown) {
                        Mist.notificationController.notify('Error while sending create key'  +
                                name);
                        error(textstate, errorThrown, 'while creating key', name);
                        that.removeObject(key);
                    }
                });
                */
            }
        });
    }
);
