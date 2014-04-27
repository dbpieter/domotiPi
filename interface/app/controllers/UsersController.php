<?php

/*
| Author: Hans Ott <hans.ott@kahosl.be>
| Date: 28/05/2014
| Projecten 1: PiControl
*/

class UsersController extends BaseController {

  public function showAddUser() {
    return 'form';
  }

  public function addUser() {
    return 'processing form';
  }

}
