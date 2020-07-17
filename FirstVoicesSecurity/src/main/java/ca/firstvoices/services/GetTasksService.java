package ca.firstvoices.services;

import java.io.IOException;
import java.util.List;
import org.nuxeo.ecm.automation.OperationException;
import org.nuxeo.ecm.core.api.Blob;
import org.nuxeo.ecm.core.api.CoreSession;
import org.nuxeo.ecm.core.api.DocumentModelList;
import org.nuxeo.ecm.core.api.NuxeoPrincipal;

/**
 * @author david
 */
public interface GetTasksService {

  Blob getTasks(CoreSession session) throws IOException;

  DocumentModelList getTasksForUser(CoreSession session, NuxeoPrincipal principal,
      Integer currentPageIndex, Integer pageSize, List<String> sortBy, List<String> sortOrder)
      throws OperationException;

}
