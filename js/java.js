$(document).ready( function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$("#enviar").click(function(e){
  //e.preventDefault();
})
$(function() {
  $("form[name='signupform']").validate({

    rules: {
      nome: "required",
      email: "required",
      data: {
      required: true,
      date: true,
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 10
      }
    },
    messages: {
      nome: "Please enter your firstname",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        maxlength: "Your password must be up to 10 characters long"
      },
      email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
        $("#insert").click(function() {
            var email = $("#email").val();
            var password = $("#password").val();
            var nome = $("#nome").val();
            var data = $("#data").val();
            var dataString = "email=" + email + "&password=" + password + "&nome=" + nome + "&data=" + data + "&insert=";
            if ($.trim(email).length > 0 & $.trim(password).length > 0 & $.trim(nome).length > 0 & $.trim(data).length > 0) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost/Projeto2/php/registar.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    success: function(data) {
                        if (data == "success") {
                            alert("Registado com sucesso");
                            $("#insert").val('Enviado');
                        } else if (data == "error") {
                            alert("Erro ao registar");
                        }
                    }
                });
            }
            return false;
        });
    }
  });
});

$(function() {
  $("form[name='loginform']").validate({

    rules: {
      loginemail: "required",
      loginemail: {
        required: true,
        email: true
      },
      loginpassword: {
        required: true,
        minlength: 5,
        maxlength: 10
      }
    },
    messages: {
      loginpassword: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
        maxlength: "Your password must be up to 10 characters long"
      },
      loginemail: "Please enter a valid email address"
    },
    submitHandler: function(form) {
      $("#btn_login").click(function(){
      var email=$("#loginemail").val();
      var password=$("#loginpassword").val();
      var dataString="loginemail="+email+"&loginpassword="+password+"&btn_login=";
      if($.trim(email).length>0 & $.trim(password).length>0)
      {
      $.ajax({
      type: "POST",
      url: "http://localhost/Projeto2/php/login.php",
      data: dataString,
      crossDomain: true,
      cache: false,
      beforeSend: function(){ $("#btn_login").html('Connecting...');},
      success: function(data){
      if(data=="success")
      {
      localStorage.login="true";
      localStorage.email=email;
      window.location.href = "index.html";
      }
      else if(data="failed")
      {
      alert("Login error");
      $("#login").html('Login');
      }
      }
      });
      }return false;
      });
    }
  });
});

$(document).ready(function() {
        var url = "http://localhost/Projeto2/php/empregos.php";
        $.getJSON(url, function(result) {
            console.log(result);
            $.each(result, function(i, field) {
              var id = field.id;
              var nomeanuncio = field.nomeanuncio;
              var localidade = field.localidade;
              var data = field.data;
              var idestado = field.idestado;
              var idtipoanuncio = field.idtipoanuncio;
                $("#listview").append("<span>$" + nomeanuncio + "</span><h2>" + localidade + " </h2><p>" + data + "</p>");
            });
        });
});
