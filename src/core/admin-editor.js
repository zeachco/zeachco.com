import axios from 'axios';

function focusItemDescriptionEditor(obj) {
  obj.style.cssText = "width:700px;height:500px;";
  obj.onblur = function() {
    obj.style.cssText = "";
  }
}
var editor_anim_speed = 0;

function update_item(id, edit) {
  if (edit == null) {
    edit = '0';
  }
  xhr = Ajax('a=update_item&e=' + edit + '&i=' + id, 'index.php');
  div = document.getElementById('item_' + id);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      div.innerHTML = xhr.responseText;
      loadAllPictures();
    }
  }
  return false;
};

export const openItemEditor = (id) => {
  axios.get()
  xhr = Ajax('a=update_item&e=1&i=' + id, 'index.php');
  div = document.getElementById("item_editor");
  div.innerHTML = "Loading...";
  $("#item_editor_container").fadeIn(editor_anim_speed);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      div.innerHTML = xhr.responseText;
    }
  }
  return false;
};

function ListSelectAll(v) {
  $(".item_multi_select:checkbox").attr('checked', v);
}

function MultiEditRequest(k) {
  var v = prompt("Enter value for '" + k + "'")
  if (v != null) {
    $("#sql_multi_set").append(k + "=" + v + ";");
  }
}

function MultiEditSave() {
  var set = $("#sql_multi_set").html();
  var select = $("#sql_multi_select").html();
  xhr = Ajax("a=save_multi_item&set=" + set + "&select=" + select, 'index.php');
  div = document.getElementById("item_editor");
  $("#item_editor_container").fadeIn(editor_anim_speed);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      div.innerHTML = xhr.responseText;
    }
  }
}

function EditMultipleItem() {
  var id_array = "";
  $('.item_multi_select:checked').each(function() {
    id_array = id_array + $(this).attr("item") + ";";
  });
  xhr = Ajax('a=update_multi_item&ids=' + id_array, 'index.php');
  div = document.getElementById("item_editor");
  $("#item_editor_container").fadeIn(editor_anim_speed);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      div.innerHTML = xhr.responseText;
    }
  }
  return false;
};

function save_item(id) {
  var flag = '';
  console.log('test');
  var post = $("#item_edit_form").serialize().replace(/([^\\\\])'/g, "$1\\\\'");
  xhr = Ajax("a=save_item&e=0&i=" + id + "&" + post, "index.php");
  div = document.getElementById('item_' + id);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      //alert(xhr.responseText);
      $("#item_editor_container").fadeOut(editor_anim_speed);
      update_item(id);
    };
  };
  document.getElementById('v').focus();
  return false;
};

function delete_item(id) {
  if (confirm("Delete item " + id + "?")) {
    xhr = Ajax("a=delete_item&i=" + id, 'index.php');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        $("#item_" + id).html(xhr.responseText);
        $("#item_editor_container").fadeOut(editor_anim_speed);
      }
    }
  }
  return false;

  xhr = Ajax('a=delete_item&e=0&i=' + id, 'index.php');
  div = document.getElementById('item_' + id);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      update_item(id);
    };
  };
  document.getElementById('v').focus();
  return false;
};

function user_add() {
  var n = document.getElementById("name");
  var u = document.getElementById("username");
  var p = document.getElementById("password");
  var flag = "";
  var oi = document.getElementById("opt_image");
  var op = document.getElementById("opt_price");
  if (oi.checked) {
    flag = flag + '&oi=on';
  }
  if (op.checked) {
    flag = flag + '&op=on';
  }
  xhr = Ajax("a=add_user&n=" + n.value + "&u=" + u.value + "&p=" + p.value + flag, 'index.php');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var r = xhr.responseText;
      if (r == "USERSAVED") {
        $("#add_user form").slideUp(500, function() {
          n.value = "";
          u.value = "";
          p.value = "";
          oi.value = "";
          op.value = "";
          $("#add_user form").slideDown(500);
        });
      } else {
        alert(r);
      }
    }
  }
  return false;
}

function user_save(id) {
  var n = document.getElementById("name");
  var u = document.getElementById("user");
  var p = document.getElementById("pass");
  var flag = "";
  var oi = document.getElementById("opt_image");
  var op = document.getElementById("opt_price");
  var oa = document.getElementById("opt_admin");
  if (oi.checked) {
    flag = flag + '&oi=on';
  }
  if (op.checked) {
    flag = flag + '&op=on';
  }
  if (oa.checked) {
    flag = flag + '&oa=on';
  }
  xhr = Ajax("a=save_user&i=" + id + "&n=" + n.value + "&u=" + u.value + "&p=" + p.value + flag, 'index.php');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var r = xhr.responseText;
      if (r == "USERSAVED") {
        $("#save_status").html("Saved! ");
      } else {
        $("#save_status").html(r);
      }
      $("#save_status").fadeIn(0);
      $("#save_status").fadeOut(5000);
    }
  }
  return false;
}

function user_delete(id) {
  if (confirm("Delete user " + id + "?")) {
    xhr = Ajax("a=delete_user&i=" + id, 'index.php');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var r = xhr.responseText;
        $("#save_status").html(r);
        $("#save_status").fadeIn(0);
        $("#save_status").fadeOut(5000, function() {
          window.location = "index.php?a=user";
        });
      }
    }
  }
  return false;
}

function error_delete(id) {
  $("#error_list_tr_" + id + " td").css("background", "#00F");
  xhr = Ajax("a=delete_error&i=" + id, 'index.php');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var r = xhr.responseText;
      $("#error_list_tr_" + id).remove();
    }
  }
  return false;
}

function ptocm(v) {
  return Math.ceil(v * 2.5);
}

function ltokg(v) {
  return Math.ceil(v * 1000 / 2.2);
}
