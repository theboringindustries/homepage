import { useTranslation } from "next-i18next";
import classNames from "classnames";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

const RefreshRadarr = () => {
  return (
    <div
      onClick={() => {
        fetch("http://dobby.elf:7878/api/v3/command?apikey=ea3b59e793ca4e4086f816d0ff65a545", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "ImportListSync",
          }),
        });
      }}
      className={classNames(
        "bg-theme-200/50 dark:bg-theme-900/20 rounded m-2 flex-1 flex flex-col items-center justify-center p-1  hover:bg-theme-300/20 dark:hover:bg-white/10 "
      )}
      style={{ margin: "0.25rem" }}
    >
      <div className="font-bold text-xs uppercase">Refresh</div>
    </div>
  );
};

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: moviesData, error: moviesError } = useWidgetAPI(widget, "movie");
  const { data: queuedData, error: queuedError } = useWidgetAPI(widget, "queue/status");

  if (moviesError || queuedError) {
    return <Container error={t("widget.api_error")} />;
  }

  if (!moviesData || !queuedData) {
    return (
      <Container service={service}>
        <Block label="radarr.wanted" />
        <Block label="radarr.missing" />
        <Block label="radarr.queued" />
        <Block label="radarr.movies" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="radarr.wanted" value={moviesData.wanted} />
      <Block label="radarr.missing" value={moviesData.missing} />
      <Block label="radarr.queued" value={queuedData.totalCount} />
      <Block label="radarr.movies" value={moviesData.have} />
      <RefreshRadarr visible />
    </Container>
  );
}
