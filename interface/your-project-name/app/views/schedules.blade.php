@extends('master')

@section('content')
  <div id="schedules">

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
            <li class="list-group-item"><a href="#" data-toggle="modal" data-target="#addSchema"><i class="glyphicon glyphicon-plus"></i> Add a schedule</a></li>
          </ul>
        </div>
        <!-- end tools -->
      </div>
      <!-- start schemas -->
      <div class="col-md-9">
        <div id="schedules">
          <div class="panel-group" id="accordion">

            <div class="schedule" data-schedule-id="1">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <input type="checkbox" class="schedule-enable" checked />
                    <a class="schedule-title" data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                      Workweek
                    </a>
                  </h4>
                </div>
                <div id="collapse1" class="panel-collapse collapse in">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <ul class="rules">
                          <li class="rule" data-cron="0 7 * * 5" data-rule-id="1">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" class="edit-rule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li class="rule" data-cron="0 7 * * 5 " data-rule-id="1">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" class="edit-rule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div class="add-rule">
                              <a href="#" data-toggle="modal" data-target="#new-rule">Add a rule</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="schedule">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <input type="checkbox" class="schedule-enable" />
                    <a class="schedule-title" data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                      Vacation
                    </a>
                  </h4>
                </div>
                <div id="collapse2" class="panel-collapse collapse">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <ul class="rules">
                          <li class="rule">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" data-toggle="modal" data-target="#editRule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li class="rule">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" data-toggle="modal" data-target="#editRule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div class="add-rule">
                              <a href="#" data-toggle="modal" data-target="#new-rule">Add a rule</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="schedule">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">
                    <input type="checkbox" class="schedule-enable" />
                    <a class="schedule-title" data-toggle="collapse" data-parent="#accordion" href="#collapse3">
                      Another schedule
                    </a>
                  </h4>
                </div>
                <div id="collapse3" class="panel-collapse collapse">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12">
                        <ul class="rules">
                          <li class="rule">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" data-toggle="modal" data-target="#editRule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li class="rule">
                            <div class="rule-description">
                              Every <strong>week</strong> on <strong>friday</strong> at <strong>07:00</strong> <a href="#" data-toggle="modal" data-target="#editRule"><i class="glyphicon glyphicon-pencil"></i></a>
                            </div>
                            <ul class="rule-devices">
                              <li class="rule-device">
                                Kitchen lights: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                TV: <strong>ON</strong>
                              </li>
                              <li class="rule-device">
                                Toilet light: <strong>OFF</strong>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <div class="add-rule">
                              <a href="#" data-toggle="modal" data-target="#new-rule">Add a rule</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- end schemas -->
    </div>
  </div>

  <div id="dialogs">

    <!-- ADD NEW SCHEDULE MODAL -->
    <div class="modal fade" id="addSchema" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Add a schedule</h4>
          </div>
          <div class="modal-body">
            <form role="form">
              <div class="form-group">
                <label for="nameSchema">Name: </label>
                <input type="text" class="form-control" id="nameSchema" placeholder="Workweek, vacation, ...">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Annuleren</button>
            <button type="button" class="btn btn-primary btn-sm">Voeg schema toe</button>
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
            <div class="cron"></div>
            <hr>
            <ul class="cron-devices">
              <li class="cron-device">
                <span class="cron-device-name">Kitchen lights:</span>
                <select class="cron-device-value">
                  <option>ON</option>
                  <option>OFF</option>
                </select>
                <a href="#" class="delete-cron-device pull-right"><i class="glyphicon glyphicon-remove"></i></a>
              </li>
            </ul>
            <hr>
            <div class="add-cron-device">
              <form role="form">
                <div class="form-group">
                  <label for="select-cron-device">Choose a device</label>
                  <select class="form-control">
                    <option>Available devices</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary btn-sm add-cron-device-btn">Add</button>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
            <button id="btnEditRule" type="button" class="btn btn-primary btn-sm">Save</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <!-- NEW RULE MODAL -->
    <div class="modal fade" id="new-rule" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">New rule for &lt;name of schedule&gt;</h4>
          </div>
          <div class="modal-body">
            <div class="cron"></div>
            <hr>
            <ul class="cron-devices">
              No devices yet. Add a device!
            </ul>
            <hr>
            <div class="add-cron-device">
              <form role="form">
                <div class="form-group">
                  <label for="select-cron-device">Choose a device</label>
                  <select class="form-control">
                    <option>Kitchen lights</option>
                    <option>TV</option>
                    <option>Toilet light</option>
                  </select>
                </div>
                <button id="btnAddCronDeviceNewRule" type="submit" class="btn btn-primary btn-sm add-cron-device-btn">Add</button>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancel</button>
            <button id="btnSaveRule" type="button" class="btn btn-primary btn-sm">Save</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

  </div>
@stop

@section('js')
<script src="assets/js/jquery-cron.js"></script>
<script src="assets/js/schedules.js"></script>
@stop
