package ca.firstvoices.tasks.services;

import java.util.List;
import org.nuxeo.ecm.automation.OperationException;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.DocumentModel;
import org.nuxeo.ecm.core.api.DocumentModelList;
import org.nuxeo.ecm.core.api.NuxeoPrincipal;

/**
 * @author david
 */
public interface FVTasksService {

  DocumentModelList getTasksForUser(CoreSession session, NuxeoPrincipal principal,
      Integer currentPageIndex, Integer pageSize, List<String> sortBy, List<String> sortOrder)
      throws OperationException;

  DocumentModel requestReviewForDocument(CoreSession session, DocumentModel doc, String comment);

  DocumentModel cancelReviewForDocument(CoreSession session, DocumentModel doc, String comment);
}
