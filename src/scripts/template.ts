/******************************************************************************/
//Template Interaction Plugin (TypeScript Edition)
/******************************************************************************/
import $ from "jquery";
import * as tvx from "./lib/tvx-plugin-module.min";
import { ImmersiveModeController } from "./im-controller";

/******************************************************************************/
//Template Handler
/******************************************************************************/
class TemplateHandler implements tvx.TVXInteractionPluginHandler {
    private imController: ImmersiveModeController = new ImmersiveModeController();
    private logger = new tvx.Logger();

    init() {        
        this.imController.init($(".content-wrapper"));
        this.logger.registerControl($("#log"));
        this.logger.debug("Init");        
    }

    ready() {
        this.imController.validate();
        this.logger.debug("Ready");
        tvx.InteractionPlugin.success("Template handler ready.");
    }

    handleEvent(data: tvx.AnyObject) {
        this.imController.handleEvent(data);
        this.logger.debug("Handle event: " + tvx.Tools.serialize(data));
    }

    handleData(data: tvx.AnyObject) {
        this.logger.debug("Handle data: " + tvx.Tools.serialize(data));
    }

    handleRequest(dataId: string, data: tvx.AnyObject, callback: (respData?: tvx.AnyObject) => void) {
        this.logger.debug("Handle request: " + dataId);
        this.logger.debug("Request data: " + tvx.Tools.serialize(data));
        callback(null);
    }
}
/******************************************************************************/

/******************************************************************************/
//Setup
/******************************************************************************/
tvx.PluginTools.onReady(() => {
    tvx.InteractionPlugin.setupHandler(new TemplateHandler());
    tvx.InteractionPlugin.init();
});
/******************************************************************************/