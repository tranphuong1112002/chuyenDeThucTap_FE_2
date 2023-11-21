import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CandidateEducationService } from 'src/app/service/candidate-eduction.service';
import { CandidateListService } from 'src/app/service/candidate-list';

@Component({
  selector: 'app-level-candidate',
  templateUrl: './level-candidate.component.html',
  styleUrls: ['./level-candidate.component.less'],
})
export class LevelCandidateComponent implements OnInit {
  isVisible = false;
  validateForm!: FormGroup;
  formEdu!: FormGroup;
  @Input() id: any;
  lstData: any;
  idpr: any;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private candidateService: CandidateEducationService,
    private notification: NzNotificationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('chang id', this.id);
    this.idpr = this.id;
    // this.candidateService.getData(this.id).subscribe((value) => {
    //   console.log('vl', value);
    //   this.lstData = value;
    // });
  }
  getData() {
    this.candidateService.getData(this.idpr).subscribe((value) => {
      console.log('vl', value);
      this.lstData = value;
      // value.forEach((element: any) => {
      //   this.formEdu.patchValue({
      //     eduName: element.eduName, // tên trường
      //     majors: element.majors, // chuyên ngành
      //     formOfTraining: element.formOfTraining, // hình thức đào tạo
      //     certfication: element.certfication, // trình độ học vấn
      //     startDate: element.startDate, // ngày bắt đầy
      //     endDate: element.endDate, // ngày kết thúc
      //   });
      // });

      console.log(this.formEdu.value);
    });
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      eduName: [null], // tên trường
      majors: [null], // chuyên ngành
      formOfTraining: [null], // hình thức đào tạo
      certfication: [null], // trình độ học vấn
      startDate: [null], // ngày bắt đầy
      endDate: [null], // ngày kết thúc
    });
    this.formEdu = this.fb.group({
      eduName: [null], // tên trường
      majors: [null], // chuyên ngành
      formOfTraining: [null], // hình thức đào tạo
      certfication: [null], // trình độ học vấn
      startDate: [null], // ngày bắt đầy
      endDate: [null], // ngày kết thúc
    });
    this.getData();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    // this.isVisible = false;

    //   {
    //     "eduName": "Đại học Tài Chính",
    //     "majors": "CNTT",
    //     "formOfTraining": "Chính quy",
    //     "certfication": null,
    //     "startDate": "2019-10-10",
    //     "endDate": "2023-07-09",
    //     "candidate": {
    //         "id": 8
    //     }
    // }
    const res = {
      eduName: this.validateForm.value.eduName,
      majors: this.validateForm.value.majors,
      formOfTraining: this.validateForm.value.formOfTraining,
      certfication: this.validateForm.value.certfication,
      startDate: moment(this.validateForm.value.startDate).format('yyyy-MM-DD'),
      endDate: moment(this.validateForm.value.endDate).format('yyyy-MM-DD'),
      candidate: {
        // candidateDTO: this.idpr,
        id: this.idpr,
      },
    };
    console.log('res', res);

    this.candidateService.createData(res).subscribe((value) => {
      console.log('dd');
      this.notification.blank('Thông báo', 'Thêm mới thành công', {
        nzStyle: {
          width: '300px',
          marginLeft: '-265px',
          color: '#56CA00',

          // backgroundColor: 'blue',
        },
        nzClass: 'test-class',
      });
      this.getData();
      this.isVisible = false;
    });
  }
  deleteEdu(id: any) {
    console.log('id delete', id);
    this.candidateService.deleteEdu(id).subscribe((value) => {
      this.notification.blank('Thông báo', 'Xóa thành công', {
        nzStyle: {
          width: '300px',
          marginLeft: '-265px',
          color: '#56CA00',

          // backgroundColor: 'blue',
        },
        nzClass: 'test-class',
      });
      this.getData();
    });
  }
  showEdit(data: any) {
    console.log('dât', data);
    this.formEdu.patchValue({
      eduName: data.eduName, // tên trường
      majors: data.majors, // chuyên ngành
      formOfTraining: data.formOfTraining, // hình thức đào tạo
      certfication: data.certfication, // trình độ học vấn
      startDate: data.startDate, // ngày bắt đầy
      endDate: data.endDate, // ngày kết thúc
    });
    console.log('this.fo', this.formEdu);
    this.isEdit = true;
  }
  editEduCancel() {
    this.isEdit = false;
  }
  editEdu() {
    const res = {
      eduName: this.formEdu.value.eduName,
      majors: this.formEdu.value.majors,
      formOfTraining: this.formEdu.value.formOfTraining,
      certfication: this.formEdu.value.certfication,
      startDate: moment(this.formEdu.value.startDate, 'DD-MM-yyyy').format(
        'yyyy-MM-DD'
      ),
      endDate: moment(this.formEdu.value.endDate, 'DD-MM-yyyy').format(
        'yyyy-MM-DD'
      ),
      candidate: {
        id: this.idpr,
      },
    };
    console.log('res', res);
    this.candidateService.updateData(this.idpr, res).subscribe((value) => {
      this.notification.blank('Thông báo', 'Cập nhật thành công', {
        nzStyle: {
          width: '300px',
          marginLeft: '-265px',
          color: '#56CA00',

          // backgroundColor: 'blue',
        },
        nzClass: 'test-class',
      });
      this.getData();
      this.isEdit = false;
    });
  }
}
