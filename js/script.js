/*
    author : @Farman Saleh
 	  date   : January 21/2023
 	  github : github.com/farmansaleh
**/

$(document).ready(function() {
            
    //Drag and drop rows and pass parent id
    drake=dragula([document.getElementById("drag-drop-list")]).on('drop', function (el) {
      // call function for set priority
      resetTableRowId("drag-drop-list");
    });
});

  function dropRow(priority_field_id,table_row_id,table_body_id) {
    //get row move position
    const move_priority = $("#"+priority_field_id).val();
    //get current element - tr
    const current_row = $("#"+priority_field_id).parents("tr").attr("id");
    //get curremt element id text like before(row-id-1) - after(row-id-)
    const current_row_text = current_row.substr(0,7);
    //get current element position
    const current_row_val=parseInt(current_row.substr(7));

    if(move_priority != null && move_priority != "" && parseInt(move_priority)>0
        && document.getElementById(current_row_text+(parseInt(move_priority)-1)) != null ) {
          
          if(current_row_val < move_priority) {
            document.getElementById(current_row_text+(parseInt(move_priority)-1)).after(document.getElementById(current_row));
          }
          else if(current_row_val >= move_priority) {
            document.getElementById(current_row_text+(parseInt(move_priority)-1)).before(document.getElementById(current_row));
          }
          
          //reset priority value
          $("#"+priority_field_id).val("");
          //reset all element id
          resetTableRowId(table_body_id);
        }
        
  }

  function resetTableRowId(table_body_id) {	

    //Iterate loop on table row
    $("#"+table_body_id+" tr").each(function(index) {
        //reset table row id 
        $(this).removeAttr("id").attr("id","row-id-"+index);
        
        // sorted serial no
        $(this).children("td:first").text(index+1);
    });

    // call if you want to update priority for db table column updation
    changePriority(table_body_id);
  }

  function changePriority(table_body_id){
    //Iterate loop on table row
    $("#"+table_body_id+" tr").each(function(index) {

        // update priority for db table column updation
        $(this).children("td:last").find("input[type='hidden']").val(index+1);
    });
  }