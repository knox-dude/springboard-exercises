describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should create table row elements and append them to serverTbody on updateServerTable()', () => {
    submitServerInfo();
    updateServerTable();

    let curServerTbody = document.querySelectorAll('#serverTable tbody tr td');
    expect(curServerTbody.length).toEqual(2);
    expect(curServerTbody[0].innerText).toEqual('Alice');
    expect(curServerTbody[1].innerText).toEqual('$0.00')
  })

  afterEach(function() {
    allServers = {};
    serverId = 0;
    serverTbody.innerHTML='';
  });
});
