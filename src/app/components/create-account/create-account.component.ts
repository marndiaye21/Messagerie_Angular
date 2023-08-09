import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscribable } from 'rxjs';
import { IUser } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  public forms!: FormGroup;

  public errors: any = {
    "lastname.required": "Le nom est obligatoire",
    "lastname.minlength": "Le nom ne doit pas dépasser 255 caractères",
    "firstname.required": "Le prenom est obligatoire",
    "firstname.minlength": "Le nom ne doit pas dépasser 255 caractères",
    "email.required": "L'email est obligatoire",
    "email.email": "Veuillez donner un email valide",
    "password": "Le password est obligatoire",
    "password.minlength": "Le password doit contenir au moins 6 caractères",
    "confirm-password.required": "Veuillez confirmer le password",
    "telephone.required": "Le téléphone est obligatoire",
    "telephone.pattern": "Le format du téléphone est incorrect",
  }

  constructor(private userSerive:UserService) {
    this.forms = new FormGroup({
      "lastname": new FormControl(" ", [Validators.required, Validators.minLength(2)]),
      "firstname": new FormControl(" ", [Validators.required, Validators.maxLength(255)]),
      "email": new FormControl(" ", [Validators.required, Validators.email]),
      "password": new FormControl(" ", [Validators.required, Validators.minLength(6)]),
      "confirm-password": new FormControl(" ", Validators.required),
      "telephone": new FormControl(" ", [Validators.required, Validators.pattern("^7(0|5|6|7|8){1}[0-9]{7}$")]),
    })
    console.log(this.forms.controls);

  }
  getErrors(fieldName: string, error: ValidationErrors) {
    return this.errors[fieldName + "." + Object.keys(error)[0]]
  }

 addUser(){
  console.log(this.forms.value);
  
   let user:IUser={
     "lastname":this.forms.value.lastname,
      "firstname": this.forms.value.firstname,
      "email": this.forms.value.email,
      "password":this.forms.value.password,
      "confirm-password":this.forms.value.confirm-password,
      "telephone": this.forms.value.,
    }
 }


}
