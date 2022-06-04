({
	scanUrlsInFileInHelper : function(cmp, event) {
        // call action from the APEX controller UrlScannerController
        var action = cmp.get("c.fetchUrlsAndTheirStatuses");
        var caseId = cmp.get("v.recordId");
        
        action.setParams({
            caseId : caseId
        });
        
        action.setCallback(this, function(response){
            // Init toast to display success message
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            
            if(state === "SUCCESS") {
                var data = response.getReturnValue();
                
                // Populate data from the response of UrlScannerController APEX, which is a map where the key is 'url' and the results are the urls of said method
                cmp.set("v.data", data.list);
                // showList by default is false, and is only set as true when the state of this action is success to show the datatable only after attaching a file to the case
                cmp.set("v.showList", true);
                
                if(!data.status) {
                    toastEvent.setParams({
                        "type": "success",
                        "title" : "Success",
                        "message" : "File is attached to the case succesfully"
                    });
                }
                else {
                    toastEvent.setParams({
                        "type": "error",
                        "title" : "Malicious file",
                        "message" : "File attached contains malicious urls and will be deleted from this case"
                    });
                }
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
	},
    
    showToastMessage : function(cmp, event) {
        var action = cmp.get("c.getIfFileIsMalicious");
        
        action.setCallback(this, function(response){
            // Init toast to display success message
            var toastEvent = $A.get("e.force:showToast");
            var state = response.getState();
            
            if(state === "SUCCESS") {
                
            }
        });
        $A.enqueueAction(action);
	}
});