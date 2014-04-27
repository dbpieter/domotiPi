@extends('master')

@section('content')
<div id="overview">

  <!-- start errors -->
  <div id="errors"></div>
  <!-- end errors -->

  <div class="row">

    <!-- start tools -->
    <div class="col-md-3">
      <div id="tools">
        <ul class="list-group">
          <li class="list-group-item"><a id="turn-off-all-devices" href="#">Switch all devices OFF</a></li>
          <li class="list-group-item"><a id="turn-on-all-devices" href="#">Switch all devices ON</a></li>
          <li class="list-group-item"><a href="#" data-toggle="modal" data-target="#addDevice"><i class="glyphicon glyphicon-plus"></i> Add a device</a></li>
        </ul>
      </div>
    </div>
    <!-- end tools -->

    <!-- start devices -->
    <div id="devices" class="col-md-9">
      <div class="row">
        <div class="col-md-12">
          <div class="well">
            <div class="chart">
              <h4 class="title">Temperature (C°)</h4>
              <canvas id="temperature" width="800" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
      <!-- end devices -->

      <!-- start dialogs -->
      <div id="dialogs">

        <div class="modal fade" id="deviceSettings" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Kitchen lights</h4>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group">
                    <label for="naamApparaat">Name: </label>
                    <input type="text" class="form-control" id="naamApparaat" placeholder="Kitchen lights">
                  </div>
                </form>
                <p>
                  <i class="glyphicon glyphicon-info-sign"></i> Connected to GPIO 1.
                </p>
                <button class="btn btn-danger btn-xs">Delete</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm">Save</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="addDevice" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Add device</h4>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group">
                    <label for="naamApparaatt">Name: </label>
                    <input type="text" class="form-control" id="naamApparaatt" placeholder="Kitchen lights">
                  </div>
                  <select class="form-control">
                    <option>GPIO 1</option>
                    <option>GPIO 2</option>
                    <option>GPIO 3</option>
                    <option>GPIO 4</option>
                    <option>GPIO 5</option>
                    <option>GPIO 6</option>
                    <option>GPIO 7</option>
                    <option>GPIO 8</option>
                    <option>GPIO 9</option>
                    <option>GPIO 10</option>
                  </select>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                <button id="btnAddDevice" type="button" class="btn btn-primary btn-sm">Add device</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

      </div>
      <!-- end dialogs -->
    </div>
  </div>

</div>
@stop

@section('js')
<script src="assets/js/Chart.min.js"></script>
<script src="assets/js/interface.js"></script>
@stop
