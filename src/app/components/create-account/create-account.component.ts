import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
	public forms!: FormGroup;
	public erreurConfirmation: boolean = false;
	public user!: IUser;

	public backErrors : any = {
		phone: { valid: true, message: "" },
		email: { valid: true, message: ""},
		
	}

	public errors: any = {
		"lastname.required": "Le nom est obligatoire",
		"lastname.minlength": "Le nom ne doit pas dépasser 255 caractères",
		"firstname.required": "Le prenom est obligatoire",
		"firstname.minlength": "Le nom ne doit pas dépasser 255 caractères",
		"email.required": "L'email est obligatoire",
		"email.email": "Veuillez donner un email valide",
		"password.required": "Le password est obligatoire",
		"password.minlength": "Le password doit contenir au moins 6 caractères",
		"password_confirmation.required": "Veuillez confirmer le password",
		"telephone.required": "Le téléphone est obligatoire",
		"telephone.pattern": "Le format du téléphone est incorrect",
	}

	constructor(private userService: UserService) {
		this.forms = new FormGroup({
			"lastname": new FormControl("", [Validators.required, Validators.minLength(2)]),
			"firstname": new FormControl("", [Validators.required, Validators.maxLength(255)]),
			"email": new FormControl("", [Validators.required, Validators.email]),
			"password": new FormControl("", [Validators.required, Validators.minLength(6)]),
			"password_confirmation": new FormControl("", Validators.required),
			"telephone": new FormControl("", [Validators.required, Validators.pattern("^7(0|5|6|7|8){1}[0-9]{7}$")]),
		});
	}

	getErrors(fieldName: string, error: ValidationErrors) {
		return this.errors[fieldName + "." + Object.keys(error)[0]];
	}

	handleConfirmedPassword() {
		this.erreurConfirmation = this.forms.value.password !== this.forms.value.password_confirmation;
		console.log("test1");

	}
	addUser() {
		this.user = {
			"firstname": this.forms.value.firstname,
			"lastname": this.forms.value.lastname,
			"phone": this.forms.value.telephone,
			"email": this.forms.value.email,
			"password": this.forms.value.password,
			"password_confirmation": this.forms.value.password_confirmation,
		}

		return this.userService.addUser(this.user).subscribe(
			value => {
				console.log(value);
				this.forms.reset();
			}, error => {
				let errors: any = error.error.errors;
				let obj: any = Object.entries(errors);
				console.log(Object.entries(errors));
				for (const [errorKey, errorMessage] of obj) {
					this.backErrors[errorKey].valid = false;
					this.backErrors[errorKey].message = errorMessage[0];
				}
			}
		)
	}
}

