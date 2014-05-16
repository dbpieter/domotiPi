@extends('master')

@section('content')
  <div id="settings">

    <!-- the errors will show here -->
    <div id="errors"></div>
    <!-- end errors -->

    <div class="row">
      <!-- start settings -->
      <div class="col-md-12">
        <h3>Settings</h3>
        <hr>

        <div id="accounts">
          <div class="row">
            <div class="col-md-6">
              <h4>Accounts</h4>
              <ul class="list-group">
                <li class="list-group-item user"><i class="glyphicon glyphicon-user"></i> <span class="user-name">Hans Ott</span> <span class="pull-right"><a class="edit-user" href="#">User Settings</a></span></li>
                <li class="list-group-item user"><i class="glyphicon glyphicon-user"></i> <span class="user-name">Alexander Delemarre</span> <span class="pull-right"><a class="edit-user" href="#">User Settings</a></span></li>
                <li class="list-group-item user"><i class="glyphicon glyphicon-user"></i> <span class="user-name">Pieter De Bruyne</span> <span class="pull-right"><a class="edit-user" href="#">User Settings</a></span></li>
                <li class="list-group-item">
                  <a href="{{ URL::to('settings/users/add') }}" class="add-user">Add user</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="interval">
          <div class="row">
            <div class="col-md-6">
              <h4>Temperature update interval</h4>
              <div class="form-group">
                <select class="form-control" id="temperature-interval">
                  <option>30 seconds</option>
                  <option>1 minute</option>
                  <option>5 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div class="row">
          <div class="col-md-12">
            <button class="btn btn-primary">Save settings</button>
          </div>
        </div>
      </div>
      <!-- end settings -->
    </div>
  </div>
@stop

@section('js')

@stop
