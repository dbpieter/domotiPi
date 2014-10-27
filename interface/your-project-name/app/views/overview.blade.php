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
          <li class="list-group-item"><a href="#" id="open-new-device-modal" data-toggle="modal" data-target="#addDevice"><i class="glyphicon glyphicon-plus"></i> Add a device</a></li>
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

        <!-- MODIFY DEVICE MODAL -->
        <div class="modal fade" id="deviceSettings" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Edit device</h4>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group">
                    <label for="naamApparaat">Name: </label>
                    <input type="text" class="form-control" id="naamApparaat" placeholder="Kitchen lights">
                  </div>
                </form>
                <p>
                  <i class="glyphicon glyphicon-info-sign"></i> Connected to PIN <span id="connectedPin"></span>.
                </p>
                <button class="btn btn-danger btn-xs" id="btnDeviceDelete">Delete</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
                <button id="btnModifyDevice" type="button" class="btn btn-primary btn-sm">Save</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- ADD NEW DEVICE MODAL -->
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
                    <label for="naamApparaat">Name: </label>
                    <input type="text" class="form-control" id="nameDevice" placeholder="Kitchen lights">
                    <small class="text-danger new-device-errors"></small>
                  </div>
                  <select id="selectGPIO" class="form-control"></select>
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
<script src="assets/js/overview.js"></script>
<script src="assets/js/temperature.js"></script>
@stop
