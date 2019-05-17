import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.page.html',
  styleUrls: ['./add-meal.page.scss'],
})
export class AddMealPage {

  @Input() value: number;
  mealName:string;
  today = Date.now();
  mealDate;
  datePickerObj: any = {
    inputDate: new Date(this.today), // default new Date()
    fromDate: new Date(this.today), // default null
    showTodayButton: true, // default true
    closeOnSelect: true, // default false
    mondayFirst: true, // default false
    todayLabel: 'Today', // default 'Today'
    closeLabel: 'Close', // default 'Close'
    titleLabel: 'When do you serve your meal?', // default null
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    dateFormat: 'YYYY-MM-DD', // default DD MMM YYYY
    clearButton : true , // default true
    momentLocale: 'pt-BR', // Default 'en-US'
    yearInAscending: true, // Default false
    btnProperties: {
      expand: 'block', // Default 'block'
      fill: '', // Default 'solid'
      size: '', // Default 'default'
      disabled: '', // Default false
      strong: '', // Default false
      color: '' // Default ''
    }
  };

  constructor(public modal: ModalController) { }

  ngOnInit() {
    
  }

  hideModal(){
    this.modal.dismiss()
  }

  onSubmit(){
    
  }

  // postMeal(){
  //   this.modal.dismiss({
  //     //some values to pass for sending to database
  //     // 'result': value
  //   })
  // }
}
