package ca.firstvoices.core.io.models;

import ca.firstvoices.core.io.utils.StateUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.io.Serializable;
import org.nuxeo.ecm.core.api.DocumentModel;

/**
 * Simple Core Entity object is intended to represent a simplified view of any type in FirstVoices
 * It is mostly to be used by an enricher or marshaller to represent a sub-document
 * It should reference fields that are relevant to all types
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonPropertyOrder({"uid", "title", "type", "isNew", "visibility" })
public class SimpleCoreEntity implements Serializable {

  @JsonProperty("uid")
  private final String uid;

  @JsonProperty("title")
  private final String title;

  @JsonProperty("type")
  private final String type;

  @JsonProperty("isNew")
  private final Boolean isNew;

  @JsonProperty("visibility")
  private final String visibility;

  public SimpleCoreEntity(DocumentModel doc) {
    this.title = String.valueOf(doc.getPropertyValue("dc:title"));
    this.type = doc.getType();
    this.isNew = ("New".equals(doc.getCurrentLifeCycleState()));
    this.uid = doc.getId();
    this.visibility = StateUtils.stateToVisibility(doc.getCurrentLifeCycleState());
  }

  public String getTitle() {
    return title;
  }

  public String getType() {
    return type;
  }

  public Boolean getIsNew() {
    return isNew;
  }

  public String getUid() {
    return uid;
  }

  public String getVisibility() {
    return visibility;
  }
}
