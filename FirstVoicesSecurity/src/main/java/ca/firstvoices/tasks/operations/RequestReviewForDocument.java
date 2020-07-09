package ca.firstvoices.tasks.operations;

import ca.firstvoices.tasks.services.FVTasksService;
import org.nuxeo.ecm.automation.OperationException;
import org.nuxeo.ecm.automation.core.Constants;
import org.nuxeo.ecm.automation.core.annotations.Context;
import org.nuxeo.ecm.automation.core.annotations.Operation;
import org.nuxeo.ecm.automation.core.annotations.OperationMethod;
import org.nuxeo.ecm.automation.core.annotations.Param;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.runtime.api.Framework;

/**
 * @author david
 */
@Operation(id = GetTasksForUserGroupOperation.ID, category = Constants.CAT_SERVICES, label =
    "RequestReviewForDocument", description =
    "Sets or cancels a review for a document with comments by a language admin")
public class RequestReviewForDocument {

  public static final String ID = "Document.RequestReviewForDocument";

  @Param(name = "comment", required = false)
  private String comment;

  @Param(name = "status", values = {"review", "cancel"})
  private String status;

  @Context
  protected CoreSession session;

  @OperationMethod
  public void run(DocumentModel doc) throws OperationException {

    FVTasksService tasksService = Framework.getService(FVTasksService.class);

    if (status.equals("review")) {
      tasksService.requestReviewForDocument(session, doc, comment);
    }

    if (status.equals("cancel")) {
      tasksService.cancelReviewForDocument(session, doc, comment);
    }

  }
}
