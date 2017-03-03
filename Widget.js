define([
  "dojo/_base/declare",
  "dojo/_base/array",
   "dojo/_base/lang",
   "dojo/dom-style",
   "dojo/on",
   "dojo/query",
  "jimu/BaseWidget"
], function(
  declare,
  array,
  lang,
  domStyle,
  on,
  query,
  BaseWidget
) {

  var clazz = declare([BaseWidget], {
    //these two properties are defined in the BaseWiget
    baseClass: 'google-analytics',
    name: 'GoogleAnalytics',
    logMapEvents: false, // defaults to false, gets set from config
    logLayerEvents: false, // defaults to false, gets set from config

    // add additional properties here

    postCreate: function () {
        // summary:
        //      Overrides method of same name in dijit._Widget.
        
        //console.log("Init Google Analytics")
        // This starts the google analytics code (do not delete)
        eval(this.config.code)
        // Event
        ga('send', 'event', 'Widget', 'Google Analytics', 'postCreate');


        // set whether to log map/layer events
        this.logClk = this.config.logClk;
        this.logDblClk = this.config.logDblClk;
        this.logExtChg = this.config.logExtChg;
        this.logPan = this.config.logPan;
        this.logZoom = this.config.logZoom;
        this.logLayers = this.config.logLayers;

      // summary:
      //      Overrides method of same name in dijit._Widget.
      // tags:
      //      private
      this.inherited(arguments);
      //console.log('GoogleAnalytics::postCreate', arguments);
      
    },

    // start up child widgets
    startup: function() {
          // summary:
          //      Overrides method of same name in dijit._Widget.
          // tags:
          //      private
          this.inherited(arguments);
          
          //console.log('GoogleAnalytics::startup', arguments);
        
          // user selected option to log map events
          if (this.logClk){
              // On click
              on(this.map, "click", lang.hitch(this, function (event) {
                  ga('send', 'event', 'Map Interaction', 'click', 'x:'+ event.x + " y:" + event.y);
              }));
          }
              // On Double click
            if (this.logDblClk){
              on(this.map, "dbl-click", lang.hitch(this, function (event) {
                  ga('send', 'event', 'Map Interaction', 'dbl-click', 'x:' + event.x + " y:" + event.y);
        
              }));
            }
              // On Extent Change
              if (this.logExtChg){
                on(this.map, "extent-change", lang.hitch(this, function (event) {
                    ga('send', 'event', 'Map Interaction', 'extent-change', 'delta [x,y]:[' + event.delta.x + "," + event.delta.y + "], extent[xmax,xmin,ymax,ymin]: [" + event.extent.xmax + "," + event.extent.xmin + "," + event.extent.ymax + "," + event.extent.ymin + "] levelChange:" + event.levelChange + " lod[level,scale]: [" +  event.lod.level + "," + event.lod.scale + "]");
                }));
              }
              
                // On pan
            if (this.logPan){
              on(this.map, "pan-end", lang.hitch(this, function (event) {
                  ga('send', 'event', 'Map Interaction', 'pan', 'delta [x,y]:[' + event.delta.x + "," + event.delta.y + "], extent[xmax,xmin,ymax,ymin]: [" + event.extent.xmax + "," + event.extent.xmin + "," + event.extent.ymax + "," + event.extent.ymin + "]");
              }));
            }
        
                // On Zoom
            if (this.logZoom){
              on(this.map, "zoom-end", lang.hitch(this, function (event) {
                  ga('send', 'event', 'Map Interaction', 'zoom', 'anchor [x,y]:[' + event.x + "," + event.y + "], extent[xmax,xmin,ymax,ymin]: [" + event.extent.xmax + "," + event.extent.xmin + "," + event.extent.ymax + "," + event.extent.ymin + "]" + " zoomFactor: " +event.zoomFactor);
              }));
         }
     
         // user selected option to log layer events
         array.forEach(this.logLayers, lang.hitch(this, function(id){
                var layer = this.map.getLayer(id);
                on(layer, 'visibility-change', lang.hitch(this, function(event){
					  ga('send', 'event', 'layer-visibility', layer.id, event.visible);
				  }));
         }));
        
         
         // hide the icon in the menu bar  
        this._hideMenuIcon(this.id, this.label);
         //end startup()      
    },

    onOpen: function () {
      // summary:
      //      Overrides method of same name in jimu._BaseWidget.
      
      //console.log('GoogleAnalytics::onOpen', arguments);
      // add code to execute whenever the widget is opened
    },

    onClose: function() {
      // summary:
      //      Overrides method of same name in jimu._BaseWidget.
      
      //console.log('GoogleAnalytics::onClose', arguments);

      // add code to execute whenever the widget is closed
    },
    
    _hideMenuIcon:function(id, label){
        // should work with all themes
        // Usage, takes id and label and selects div element with a matching settingid or title.
        // Some themes use a settingsid, others use title
        //The only items that will have this are the icon divs.
        
        function hide(nodes){
            // run in loop just in case we get more than one node
            array.forEach(nodes, function(node){
                domStyle.set(node, "display", "none");
            });
        }
        
        var byId, byLabel, qryById, qryByLabel;
        
        qryById = "[settingid=\'" + id + "\']";
        nodesById = query(qryById);
        qryByLabel = "[title=\'" + label + "\']";
        nodesByLabel = query(qryByLabel);
        
        if (nodesById.length > 0){
            hide(nodesById);
        }
        else if (nodesByLabel.length > 0){
            hide(nodesByLabel);
        }
        else{
            alert("Google Analytics Widget Failed to Hide it's Icon.  Widget not supported with this theme");
        }
    }

  });

  return clazz;
});