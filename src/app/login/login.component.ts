import { Component, OnInit }        from "@angular/core";
import { RouterExtensions }         from "@nativescript/angular";
import { alert }                    from "@nativescript/core";
import { Page }                     from "@nativescript/core";
import { registerElement }          from '@nativescript/angular';
import { LottieView }               from 'nativescript-lottie';
import { User } from "../Interfaces/user.model";
import { LoginService } from "../Services/login.service";

registerElement('LottieView', () => <any>LottieView);
 
@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit {

//*FOR Loading ANIMATION*/
  public loop: boolean = true;    
  public autoPlay: boolean = true;
  public animations: string[] = [       
      'Lottie/taxianimation.json',        
  ]; 
  public src: string=this.animations[0];
  private _lottieView: LottieView;    
/*//////////////////////////////////////*/

  public user: User;
  processing : boolean = false;
  issecure : boolean  = true;
  
constructor(
  private page: Page,
  private loginService: LoginService,
  private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
  }

  ngOnInit() {}  

  lottieViewLoaded(event) {
    this._lottieView = <LottieView>event.object;
  }

  submit(user: User) {
    if (!this.user.username || !this.user.password) {
      this.alert("Please provide both an email address and password.");
      return;
    }
    this.processing = true;
    this.login(user);
  }

  login(user) {
    this.loginService.login(user)
     .subscribe((result) => {
         this.onLoginSuccess(result);
     }, (error) => {
          console.log("the error when attempting to log in is",error);
    //What should happen
        //  this.processing = false;
        //  this.alert("Unfortunately we could not find your account or the password you entered is incorrect. Please also check your connectivity.");

    //What happens for now... Log User in anyway even though there is an error and route him to the home screen
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
     });
  }

  private onLoginSuccess(res) {
    this.loginService.setAuthToken(res.token);
    this.routerExtensions.navigate(["/home"], { clearHistory: true });
  }

  toggleisSecure(){
          this.issecure = !this.issecure;      
  }

  alert(message: string) {
          return alert({
            title: "EverTaxi",
            okButtonText: "OK",
            message
    });
  }
}
