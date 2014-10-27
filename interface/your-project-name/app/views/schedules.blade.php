@extends('master')

@section('content')
  <div id="schedules-page">

    <!-- the errors will show here -->
    <div id="errors"></div>
    <!-- end errors -->

    <div class="row">
      <div class="col-md-3">
        <!-- start tools -->
        <div id="tools">
          <ul class="list-group">
            <li class="list-group-item"><a id="enable-all-schedules" href="#">Enable all schedules</a></li>
            <li class="list-group-item"><a id="disable-all-schedules" href="#">Disable all schedules</a></li>
            <li class="list-group-item"><a href="#" data-toggle="modal" data-target="#addSchedule"><i class="glyphicon glyphicon-plus"></i> Add a schedule</a></li>
          </ul>
        </div>
        <!-- end tools -->
      </div>
      <!-- start schemas -->
      <div class="col-md-9">
        <div id="schedules">
          <div id="schedules-info"></div>
          <div class="panel-group" id="accordion"></div>
        </div>
      </div>
      <!-- end schemas -->
    </div>
  </div>

  <div id="dialogs">

    <!-- ADD NEW SCHEDULE MODAL -->
    <div class="modal fade" id="addSchedule" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Add a schedule</h4>
          </div>
          <div class="modal-body">
            <form role="form">
              <div class="form-group">
                <label for="nameSchedule">Name: </label>
                <input type="text" class="form-control" id="nameSchedule" placeholder="Workweek, vacation, ...">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="btnAddSchedule">Add schedule</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- EDIT RULE MODAL -->
    <div class="modal fade" id="editRuleModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Edit rule</h4>
          </div>
          <div class="modal-body">
            <form> 
              <div class="form-group">
                <div class="cron"></div>
              </div>
              <div class="form-group">
                <label for="select-cron-device">Choose a device</label>
                <select id="select-cron-device" name="select-cron-device" class="form-control"></select>
              </div>
              <div class="form-group">
                <label for="select-cron-device-value">ON or OFF?</label>
                <select id="select-cron-device-value" name="select-cron-device-value" class="form-control">
                  <option value="1">ON</option>
                  <option value="0">OFF</option>
                </select>
              </div>
            </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
            <button id="btnEditRule" type="button" class="btn btn-primary btn-sm">Save</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>

    <!-- NEW RULE MODAL -->
    <div class="modal fade" id="new-rule-modal" tabindex="1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">New rule</h4>
          </div>
          <div class="modal-body">
            <form> 
              <div class="form-group">
                <div class="cron"></div>
              </div>
              <div class="form-group">
                <label for="select-cron-device">Choose a device</label>
                <select id="select-cron-device-new-rule" name="select-cron-device" class="form-control"></select>
              </div>
              <div class="form-group">
                <label for="select-cron-device-value">ON or OFF?</label>
                <select id="select-cron-device-value-new-rule" name="select-cron-device-value" class="form-control">
                  <option value="1">ON</option>
                  <option value="0">OFF</option>
                </select>
              </div>
            </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
            <button id="btnNewRule" type="button" class="btn btn-primary btn-sm">Save</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</div>
@stop

@section('js')
<script src="assets/js/jquery-cron.js"></script>
<script src="assets/js/moment.min.js" type="text/javascript"></script>
<script src="assets/js/later.min.js" type="text/javascript"></script>
<script src="assets/js/cron.js" type="text/javascript"></script>
<script src="assets/js/prettycron.js" type="text/javascript"></script>
<script src="assets/js/schedules.js"></script>
@stop
