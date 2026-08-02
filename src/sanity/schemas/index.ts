import blockContent from "./blockContent";
import service from "./service";
import project from "./project";
import post from "./post";
import teamMember from "./teamMember";
import fitoutService from "./fitoutService";
import location from "./location";
import siteSettings from "./siteSettings";
import page from "./page";
import previewToken from "./previewToken";
import { sectionSchemas } from "./sections";

export const schemaTypes = [
  blockContent,
  service,
  project,
  post,
  teamMember,
  fitoutService,
  location,
  siteSettings,
  page,
  previewToken,
  ...sectionSchemas,
];
