import { NgModule } from "@angular/core";
import { CanDirective } from "./can/can.directive";

@NgModule({
    imports: [CanDirective],
    exports: [CanDirective]
})
export class AppDirectiveModule {

}