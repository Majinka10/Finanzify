import { Component, inject } from "@angular/core";
import { SpinnerService } from "../../services/spinner/spinner.service";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [],
    template:`
    @if (isLoading()){
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }`,
})

export default class SpinnerComponent {
    private readonly spinnerSvc = inject(SpinnerService);
    isLoading = this.spinnerSvc.isLoading;

}