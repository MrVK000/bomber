import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  score: number = 0;
  level: number = 3;
  sourceArray: number[] = [1, 2, 3];
  initialArray: any = [];
  bgColorArray: boolean[] = [];
  countArray: boolean[] = [];
  result: string = 'wdewd';
  isGameOverKey = false;
  totalScore: number = 0;

  ngOnInit() {
    this.arrayCreateFunc();
  }

  arrayCreateFunc() {
    this.initialArray = [];
    this.bgColorArray = [];
    this.countArray = [];
    this.isGameOverKey = false;
    this.totalScore = 0;
    this.score = 0;
    for (let i = 0; i < (this.level * this.level) / 2; i++) {
      let randomNumber = this.shuffle(this.sourceArray)[0]
      this.initialArray.push(randomNumber)
    }
    for (let i = Math.round((this.level * this.level) / 2); i < (this.level * this.level); i++) {
      this.initialArray[i] = 0;
    }
    this.shuffle(this.initialArray);

    this.initialArray.forEach((item: any) => {
      this.bgColorArray.push(false);
      this.countArray.push(false);
      this.totalScore += item;
    })
    // console.log('iniiii>>>>', this.initialArray, this.level);
  }


  scoreFunc(num: any, i: number) {

    if (this.isGameOverKey === false) {
      if (num !== 0 && num !== 'x' && this.countArray[i] === false) {
        this.score = this.score + num;
        this.countArray[i] = true;
      }
      else {
        if (num === 0) {
          this.initialArray.forEach((element:number,i:number) => {
            if(this.initialArray[i] == 0)
            this.initialArray[i] = 'x';
          });
          this.isGameOverKey = true;
          this.result = 'Game Over:(';
        }
      }
      this.bgColorArray[i] = true;
      if (this.score == this.totalScore) {
        this.initialArray.forEach((element:number,i:number) => {
          if(this.initialArray[i] == 0)
          this.initialArray[i] = 'x';
        });
        this.result = 'You Win:)';
        this.isGameOverKey = true;
      }
    }
  }

  gridFunc() {
    return `grid-template-columns: repeat(${this.level}, 64px)`;
  }

  nextLevelFunc() {
    this.level += 1;
    this.arrayCreateFunc();
  }

  gameOverFunc() {
    this.level = 3;
    this.isGameOverKey = false;
    this.totalScore = 0;
    this.score = 0;
    this.arrayCreateFunc();
  }

  imgFunc(i: any) {
    return isNaN(i);
  }

  shuffle(array: number[]) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}

