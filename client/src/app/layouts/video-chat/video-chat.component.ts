
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { VideoChatService } from './video-chat.service';
import { Employee } from '../../model/ad-employee.model';
import { environment } from '../../../environment/environment';
import { firstValueFrom } from 'rxjs';


function randomID(len:number) {
  let result = '';
  if (result) return result;
  var chars = environment.video_key ,
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}


@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.css'
})
export class VideoChatComponent {

 employeeProfile!: Employee;

  @ViewChild('root')
  root!: ElementRef;

  constructor(  private employeeService: VideoChatService ) {}

  
  ngOnInit(): void {
    this.loadProfile();
  }


  async loadProfile() {
    try {
      const profile = await firstValueFrom(this.employeeService.getProfile());
      this.employeeProfile = profile;
    } catch (error) {
      console.error('Error fetching employee profile:', error);
    }
  }

  ngAfterViewInit() {
      const roomID = getUrlParams().get('roomID') || randomID(5);

     // generate Kit Token
      const appID = 792852619 ;
      const serverSecret = environment.secret_key ;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
   

      // Start a call.
      zp.joinRoom({
        container: this.root.nativeElement,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },

    

      });
  }
  
}
