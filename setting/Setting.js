///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'dojo/_base/lang',
    'dojo/_base/array',
    "jimu/dijit/CheckBox",
    "dojo/dom-construct",
    "dojo/dom",
    'dojo/on',
    "dojo/query",
    "dijit/form/Textarea",
    "dojo/NodeList-traverse",
  ],
  function(
    declare,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    lang,
    array,
    Checkbox,
    domConstruct,
    dom,
    on,
    query) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
        //these two properties is defined in the BaseWidget
        baseClass: 'my-app-setting',
        
        startup: function () {
            this.inherited(arguments); 
            this. _setLayers();    
            this.setConfig(this.config);
        },
       _setLayers: function(){
           var opLayers = this.map.itemInfo.itemData.operationalLayers;
           array.forEach(opLayers, function(layer){
                var layerId = layer.id;
                var div = domConstruct.create("div");
                var checkBox = new Checkbox({
                    id:layerId,
                    class: "layerids",
                    name: layerId,
                    checked: true
                }, layerId + "_widget")
                checkBox.startup();
                div.appendChild(checkBox.domNode);
                div.appendChild(domConstruct.create("label", {"for": checkBox.id, innerHTML: layerId}));
                domConstruct.place(div, dom.byId('layer-ids'), "first");
           }) 
       }, 
        setConfig: function (config) {
            // set the setting screen to match the config file
            this.config = config;
            this.codeInput.set('value', this.config.code);
            this.logClk.setValue(this.config.logClk);
            this.logDblClk.setValue(this.config.logDblClk);
            this.logExtChg.setValue(this.config.logExtChg);
            this.logPan.setValue(this.config.logPan);
            this.logZoom.setValue(this.config.logZoom);
        },

        getConfig: function() {
            //get layer list to monitor
            var checkedLayerBoxes = dojo.query(".layerids > .checkbox.checked").parent();
            checkedLayerIds = array.map(checkedLayerBoxes, function(item){
                 return item.id;
             });
            // pull the user config values from the settings menu here
            this.config.code = this.codeInput.get('value');
            this.config.logClk = this.logClk.getValue();
            this.config.logDblClk = this.logDblClk.getValue();
            this.config.logExtChg = this.logExtChg.getValue();
            this.config.logPan = this.logPan.getValue();
            this.config.logZoom = this.logZoom.getValue();
            this.config.logLayers = checkedLayerIds;
            return this.config;
        }

    });
  });