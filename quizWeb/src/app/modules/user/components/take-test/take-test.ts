import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared-module';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Test } from '../../services/test';
import { UserStorage } from '../../../auth/services/user-storage';


@Component({
  selector: 'app-take-test',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './take-test.html',
  styleUrl: './take-test.scss'
})
export class TakeTest {
    questions: any[] = [];
    testId: any;
  
    selectedAnswers: {[key:number]: string} = {};

    timeRemaining: number = 0;
    interval:any;

  constructor(private testService:Test,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.testId = +params.get('id');

      this.testService.getTestQuestions(this.testId).subscribe(res => {
        this.questions = this.shuffleArray([...res.questions]);
        console.log(this.questions);
        
        
        this.timeRemaining = res.testDTO.time || 0; // Convert minutes to seconds
        this.startTimer();
        this.cd.detectChanges();

      })
      
      
  })  
}

startTimer() {
  const halfTime = Math.floor(this.timeRemaining / 2); 
  this.interval = setInterval(() => {
    if(this.timeRemaining > 0){
      this.timeRemaining--;
      if (this.timeRemaining === halfTime) {
        this.message.info(`⏳ Half of your test time is over!`, { nzDuration: 4000 });
      }
      this.cd.detectChanges();
    }else{
      clearInterval(this.interval);
      this.submitAnswers();
    }
},1000);
}

getFormattedTime(): string {
  const minutes = Math.floor(this.timeRemaining / 60);
  const seconds = this.timeRemaining % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

onAnswerChange(questionId:number, selectedOption:string){
  this.selectedAnswers[questionId] = selectedOption;
  console.log(this.selectedAnswers);
}

submitAnswers(){
  const answerList = Object.keys(this.selectedAnswers).map(questionId =>{
    return{
        questionId: +questionId,
        selectedOption: this.selectedAnswers[questionId]
    }
  })

  const data = {
    testId: this.testId,
    userId: UserStorage.getUserId(),
    responses: answerList
  }
  this.testService.submitTest(data).subscribe(res=>{
    this.message.success(`Test Submitted Successfully`,{nzDuration:5000});
    this.router.navigateByUrl("/user/view-test-results");
  },error=>{
    this.message.error(`Failed to submit the test. Please try again.`,{nzDuration:5000});
  })
}

// Fisher-Yates shuffle
shuffleArray(array: any[]): any[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

}
