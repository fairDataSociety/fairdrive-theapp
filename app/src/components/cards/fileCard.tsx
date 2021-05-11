import React from "react";
import CardWrapper from "./cardWrapper/cardWrapper";
import CardHeader from "./cardHeader/cardHeader";
import CardBody from "./cardBody/cardBody";
import { InfoIcon } from "../icons/icons";

export interface Props {
  fileName: string;
  fileSize: string;
  dateCreated: string;
}

function ProjectCard(props: Props) {
  const { fileName, fileSize, dateCreated } = props;
  return (
    <CardWrapper>
      <CardHeader Icon={InfoIcon} heading={fileName} />
      <CardBody fileSize={fileSize} dateCreated={dateCreated} />
    </CardWrapper>
  );
}

export default React.memo(ProjectCard);
