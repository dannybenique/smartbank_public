// coloca "0" a numeros menores de 10
function pad(s) {
  return (s < 10) ? "0" + s : s;
}

//formatea un numero a 2 decimales y con separador de miles
function appFormatMoney(num, c) {
  // c = cantidad decimales
  var d = "."; //decimales
  var t = ","; //miles
  var s = num < 0 ? "-" : "";
  var i = String(parseInt(num = Math.abs(Number(num) || 0).toFixed(c)));
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(num - i).toFixed(c).slice(2) : "");
};

//selecciona todas las filas en una Grid
function SelectAll(CheckBox, chkChild, appGridName) {
  var TargetBaseControl = document.getElementById(appGridName);
  var TargetChildControl = chkChild;
  var Inputs = TargetBaseControl.getElementsByTagName("input");
  for(var iCount = 0; iCount < Inputs.length; ++iCount)  {
    if(Inputs[iCount].type == 'checkbox' && Inputs[iCount].id.indexOf(TargetChildControl,0) >= 0)
    Inputs[iCount].checked = CheckBox.checked;
  }
}

//selecciona todas las filas en una Grid
function toggleAll(source,name){
  let checkboxes = document.getElementsByName(name);
  for(let x=0; x<checkboxes.length; x++) {
    checkboxes[x].checked = source.checked;
  }
}

//devuleve la URL absoluta del servidor
function appUrlServer(){
  let loc = window.location;
  let pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

//convierte una fecha dd/mm/yyyy a yyyymmdd o yyyy-mm-dd (dependiendo del simbolo= "" "-")
function appConvertToFecha(miFecha,simbolo){
  var fecha = miFecha.split("/");
  var rpta = fecha.reverse().join(simbolo);
  return rpta;
}

//convierte un numero formateado con comas a numero
function appConvertToNumero(numFormateado){
  var preNumero = numFormateado.split(",");
  var rpta = preNumero.join("");
  return Number(rpta);
}

//establecer un texto de un textbox o combobox a un label
function appSetTexto(miTarget,miSource,esCombo){
  if(esCombo){
    $(miTarget).html($(miSource+" option:selected").text());
  } else{
    $(miTarget).html($(miSource).val());
  }
}

//rellena un ComboBox con la data de la DB
function appComboBox(miCombo,miSQL,miValor){
  let datos = {TipoQuery:'ComboBox', miSubSelect:miSQL};
  appAjaxQuery(datos).done(function(resp){
    appLlenarDataEnComboBox(resp,miCombo,miValor);
  });
}

//obtiene el ubigeo de una determinada Ubicacion=region, provincia, distrito
function appComboUbiGeo(miCombo,padreID,miValor){
  let datos = {
    TipoQuery : 'ComboBox',
    miSubSelect : 'UbiGeo',
    miPadreID: padreID
  }
  appAjaxQuery(datos).done(function(resp){
    appLlenarDataEnComboBox(resp,miCombo,miValor);
  });
}

//llenar un combobox con la data YA extraida de la DB
function appLlenarDataEnComboBox(data,miComboBox,valorSelect){
  let miData = "";
  $.each(data,function(key, valor){ miData += '<option value="'+(valor.ID)+'" '+((valor.ID==valorSelect) ? ("selected") : (""))+'>'+(valor.nombre)+'</option>'; });
  $(miComboBox).html(miData);
}

//llama a la funcion AJAX para obtener los datos
function appAjaxQuery(datos,ruta){
  let rpta = $.ajax({
    url : ((ruta==undefined) ? ("includes/sql_select.php") : (ruta)),
    type : 'POST',
    dataType : 'json',
    data : {"appSQL":JSON.stringify(datos)}
  })
  .fail(function(resp){
    console.log("fail:.... "+resp.responseText);
  });
  return rpta;
}
