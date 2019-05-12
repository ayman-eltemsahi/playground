import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RandomService } from './services/random.service';
import { EnhancedCanvasComponent } from './components/enhanced-canvas/enhanced-canvas.component';

let providers = [
    RandomService
];

let declarations = [
    EnhancedCanvasComponent
]

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: declarations,
    exports: declarations,
    providers: []
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: providers
        }
    }
}
