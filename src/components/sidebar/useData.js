import { useMemo } from "react"
import { useIntl } from "react-intl";

export default function useData() {
  const { formatMessage } = useIntl();
  const sidebarData = useMemo(() => [{
    "icon": "home",
    "key": "overview",
    "label": formatMessage({id: 'Overview'}),
    "url": "/home/overview"
  }, {
    "icon": "table",
    "key": "table",
    "label": formatMessage({id: 'Table.Component'}),
    "url": "/home/users"
  }, {
    "icon": "file",
    "key": "file",
    "label": formatMessage({id: 'Upload.BigFile'}),
    "url": "/home/pkgs"
  }, {
    "icon": "area-chart",
    "key": "sub-res",
    "label": formatMessage({id: 'FirstLevel'}),
    "children": [{
      "key": "users",
      "label": formatMessage({id: 'SecondLevel'}) + "001",
      "url": "/home/users"
    }, {
      "key": "hms",
      "label": formatMessage({id: 'SecondLevel'}) + "002",
      "url": "/home/hms"
    }, {
      "key": "mm",
      "label": formatMessage({id: 'SecondLevel'}) + "003",
      "url": "/home/mm"
    }]
  }, {
    "icon": "setting",
    "key": "setting",
    "label": formatMessage({id: 'Setting'}),
    "url": "/home/setting"
  }]);

  return sidebarData;
};