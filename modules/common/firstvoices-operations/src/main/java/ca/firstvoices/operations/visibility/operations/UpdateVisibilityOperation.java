package ca.firstvoices.operations.visibility.operations;

import static ca.firstvoices.data.lifecycle.Constants.MEMBERS;
import static ca.firstvoices.data.lifecycle.Constants.PUBLIC;
import static ca.firstvoices.data.lifecycle.Constants.TEAM;

import ca.firstvoices.operations.visibility.services.UpdateVisibilityService;
import org.nuxeo.ecm.automation.core.Constants;
import org.nuxeo.ecm.automation.core.annotations.Operation;
import org.nuxeo.ecm.automation.core.annotations.OperationMethod;
import org.nuxeo.ecm.automation.core.annotations.Param;
import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.runtime.api.Framework;

/**
 * @author david
 */
@Operation(id = UpdateVisibilityOperation.ID, category = Constants.CAT_DOCUMENT, label =
    "UpdateVisibilityOperation", description =
    "Toggle the visiblity of a document that belongs " + "to the fv-lifecycle policy")
public class UpdateVisibilityOperation {

  public static final String ID = "Document.UpdateVisibilityOperation";

  @Param(name = "visibility", values = {TEAM, MEMBERS, PUBLIC})
  private String visibility;

  @OperationMethod
  public DocumentModel run(DocumentModel doc) {
    UpdateVisibilityService service = Framework.getService(UpdateVisibilityService.class);
    return service.updateVisibility(doc, visibility);
  }


}
