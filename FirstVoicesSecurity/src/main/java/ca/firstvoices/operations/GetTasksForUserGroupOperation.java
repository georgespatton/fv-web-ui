package ca.firstvoices.operations;

import static org.nuxeo.ecm.automation.core.operations.services.query.DocumentPaginatedQuery.ASC;
import static org.nuxeo.ecm.automation.core.operations.services.query.DocumentPaginatedQuery.DESC;

import ca.firstvoices.services.GetTasksService;
import java.io.IOException;
import org.nuxeo.ecm.automation.core.Constants;
import org.nuxeo.ecm.automation.core.annotations.Context;
import org.nuxeo.ecm.automation.core.annotations.Operation;
import org.nuxeo.ecm.automation.core.annotations.OperationMethod;
import org.nuxeo.ecm.automation.core.annotations.Param;
import org.nuxeo.ecm.automation.core.util.StringList;
import org.nuxeo.ecm.core.api.Blob;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.runtime.api.Framework;

/**
 * @author david
 */
@Operation(id = GetTasksForUserGroupOperation.ID, category = Constants.CAT_SERVICES, label =
    "GetTasksForUserGroupOperation", description =
    "Gets the tasks for a user, filtered by " + "group")
public class GetTasksForUserGroupOperation {

  public static final String ID = "GetTasksForUserGroupOperation";

  @Context
  protected CoreSession session;

  @Param(name = "currentPageIndex", alias = "page", required = false, description = "Target "
      + "listing page.")
  protected Integer currentPageIndex;

  @Param(name = "pageSize", required = false, description = "Entries number per page.")
  protected Integer pageSize;

  @Param(name = "sortBy", required = false, description = "Sort by properties (separated by "
      + "comma)")
  protected StringList sortBy;

  @Param(name = "sortOrder", required = false, description = "Sort order, ASC or DESC", widget =
      Constants.W_OPTION, values = {
      ASC, DESC})
  protected StringList sortOrder;

  @OperationMethod
  public Blob run() throws IOException {
    GetTasksService service = Framework.getService(GetTasksService.class);
    return service.getTasks(session);
  }

}
