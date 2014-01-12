describe("Alert", function() {

  var alertController;
  var user = new Teikei.User.Model({
    name: "John Doe",
    email: "john.doe@example.com"
  });
  var place = new Teikei.Places.Model({
    id: 42,
    name: "My little farm"
  });


  beforeEach(function () {
    alertController = Teikei.alert;
  });


  it("renders a status alert for a successful sign-up", function() {
    spyOn(alertController, "status").andCallThrough();
    Teikei.Alert.renderSignUpStatus(user);
    expect(alertController.status).toHaveBeenCalled();
    expect(alertController.status.mostRecentCall.args[0]).toMatch(/john.doe@example.com/);
    expect(alertController.status.mostRecentCall.args[1]).toMatch(false);
  });

  it("renders a success alert for a successful sign-in", function() {
    spyOn(alertController, "success");
    Teikei.Alert.renderSignInSuccess(user);
    expect(alertController.success).toHaveBeenCalled();
    expect(alertController.success.mostRecentCall.args[0]).toMatch(/John Doe/);
    expect(alertController.success.mostRecentCall.args[1]).toMatch(true);
  });

  it("renders a success alert for a successful place creation", function() {
    spyOn(alertController, "success");
    Teikei.Alert.renderPlaceCreateSuccess(place);
    expect(alertController.success).toHaveBeenCalled();
    expect(alertController.success.mostRecentCall.args[0]).toMatch(/42/);
    expect(alertController.success.mostRecentCall.args[0]).toMatch(/My little farm/);
    expect(alertController.success.mostRecentCall.args[1]).toMatch(true);

  });

});