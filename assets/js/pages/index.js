$(document).ready(function(){
  todoList();
	discussionWidget();

  function getInType() {
    var data = {
      which: "i",
      type: 1
    }
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/item-get',
      dataType: 'json',
      data: data,
      success: function(res) {
        console.log(res)
        var $firstSelect = $("#itemId");
        for (const item of res) {
          var option = "<option value=" + item.itemId + ">" + item.itemName + "</option>"
          $firstSelect.append(option)
        }
      }
    })
  }
  function getOutType() {
    var data = {
      which: "i",
      type: 0
    }
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/item-get',
      dataType: 'json',
      data: data,
      success: function (res) {
        console.log(res)
        var $outSelect = $("#selecttypesout");
        for (const item of res) {
          var option = "<option value=" + item.itemId + ">" + item.itemName + "</option>"
          $outSelect.append(option)
        }
      }
    })
  }
  function getAccount() {
    var data = {
      which: "i",
      type: 1
    }
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/account-query',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        var $accountSelect = $("#selectaccountsin");
        var $accountSelect2 = $("#selectaccountsout");
        for (const item of res) {
          var option = "<option value=" + item.accountId + ">" + item.accountName + "</option>"
          $accountSelect.append(option)
          $accountSelect2.append(option)
        }
      }
    })
  }
  function getData(){
    getInType();
    getAccount();
    getOutType();
  }
  getData()
  $("#itemId").on("change",function() {
    var itemId = $("#itemId").val();
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/item-get',
      dataType: 'json',
      data: {
        which: "s",
        type: '',
        itemId: itemId
      },
      success: function (res) {
        console.log(res)
        var $secondSelect = $(".subItemId");
        $secondSelect.empty();
        $secondSelect.append("<option>请选择子类</option>")
        for (const item of res) {
          var option = "<option value=" + item.id.subitemId + ">" + item.id.subitemName + "</option>"
          $secondSelect.append(option)
        }
      }
    })
  })
  $("#selecttypesout").on("change",function() {
    var itemId = $("#selecttypesout").val();
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/item-get',
      dataType: 'json',
      data: {
        which: "s",
        type: '',
        itemId: itemId
      },
      success: function (res) {
        console.log(res)
        var $secondSelect = $(".subItemId2");
        $secondSelect.empty();
        $secondSelect.append("<option>请选择子类</option>")
        for (const item of res) {
          var option = "<option value=" + item.id.subitemId + ">" + item.id.subitemName + "</option>"
          $secondSelect.append(option)
        }
      }
    })
  })
  $(".savein").on("click",function(){
    var time = $("#timein").val();
    var itemId = $("#itemId").val();
    var subItemId = $(".subItemId").val();
    var accountId = $("#selectaccountsin").val()
    var money = $("#moneyin").val();
    var remark = $("#remarksin").val();
    var site = $("#addrin").val();
    var memberId = $("#selectmembersin").val();
    $.ajax({
      type: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/cash-save',
      dataType: 'json',
      data: {
        which: "i",
        time: time,//注意日期格式
        site: site,
        people:'',
        money: money,
        remark: remark,
        memberId: memberId, //成员id
        itemId: itemId,//父分类id
        subItemId: subItemId,//子分类id
        accountId: accountId
      },
      success: function (res) {
        alert(res.result)
      },
      error: function (err) {
        alert("提交失败")
      }
    })
  })
  
  $("#saveout").on("click",function () {
    var time = $("#timeout").val();
    var itemId = $("#selecttypesout").val();
    var subItemId = $(".subItemId2").val();
    var money = $("#moneyout").val();
    var remark = $("#remarksout").val();
    var site = $("#addrout").val();
    var memberId = $("#selectmembersout").val();
    var accountId = $("#selectaccountsout").val();
    $.ajax({
      method: 'post',
      url: 'http://zjh.hduzjh.cn/HouseKeeper/cash-save',
      dataType: 'json',
      data: {
        which: 's',
        time: time,//注意日期格式
        site: site,
        people:'',
        money: money,
        remark: remark,
        memberId: memberId, //成员id
        itemId: itemId,//父分类id
        subItemId: subItemId,//子分类id
        accountId: accountId
      },
      success: function (res) {
        alert(res.result)
      },
      error: function (err) {
        alert("请求失败")
      }
    })
    return false;
  })
	/* ---------- Placeholder Fix for IE ---------- */
	$('input, textarea').placeholder();

	/* ---------- Auto Height texarea ---------- */
	$('textarea').autosize();
	
	$('#recent a:first').tab('show');
	$('#recent a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	}); 

	
	/*------- Moris Chart -------*/
	Morris.Donut({
		element: 'hero-donut',
		data: [
			{label: '张家豪', value: 60 },
			{label: '俞有成', value: 30 },
	      	{label: '吴伟伟', value: 10 },
	    ],
		colors: ["#36A9E1", "#d1b993", "#bdea74"],
		formatter: function (y) { return y + "%" }
	});




});
