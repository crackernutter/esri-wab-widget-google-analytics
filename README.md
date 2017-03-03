### esri-wab-widget-google-analytics ###
A google analytics widget &amp; template for use in Esri Web AppBuilder Developer edition

### Installation ###

Just download the files, and place them in an appropriately named folder in C:\%webappbuilderfolder%\client\stemapp\widgets. 
There is no support yet for v.4.x of the ArcGIS API

### Credit where credit is due ###
The primary development and structure of this widget was created by multiple other folks, for which I am very grateful.  I have made a couple improvements and tweaks to this widget to provide more granular control as to GA logging for my WebAppBuilder apps.  

### Tracked Map Events ###
I incorporated a more granular selection of map events to track, so app creators can choose which map events they want tracked and logged in Google Analytics.  They can choose among the following:

1. Map Clicks
2. Map Double Clicks
3. Map Extent Changes
4. Map Pans
5. Map Zooms

For pan and zoom events, the widget only logs for _pan-end_ and _zoom-end_ events.  Otherwise one pan or zoom will register almost 80 events.  

### Layer Visiblity Changes ###
I'm allowing app creators to track visibility changes of individual layers.  This essentially tracks how users interact with map layers, whether they turn them on or off.  This integrates with the LayerList widget, such that whenever a user checks or unchecks a layer in this widget, an event is logged in Google Analytics.  Right now the configuration UI only displays the WebMap layerId, which sometimes doesn't tell you much about the layer itself.  I guess I should change it to the layer name, but instead I changed my layerIds to names that made sense through the ArcGIS Online Assistant.  

Thanks, and let me know if you have any questions!


