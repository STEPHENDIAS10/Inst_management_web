export interface Student {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  courses: [{
    item_id: string,
    item_text: string
  }];
}
