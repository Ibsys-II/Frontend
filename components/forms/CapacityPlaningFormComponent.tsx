import React from "react";
import PropsSimulationForm from "@/components/forms/formProps";
import useApplicationContext from "@/hooks/useApplicationContext";
import useSWR from "swr";
import {ARTICLES_NAME_TO_PRODUCE} from "@/contexts/ApplicationContext";
import {PageSectionComponent} from "@/components/shared/page-section/PageSectionComponent";
import {Autocomplete, Box, Button, Card, IconButton, Input, Typography} from "@mui/joy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CircularProgress from "@mui/joy/CircularProgress";
import styled from "styled-components";

type Props = PropsSimulationForm;

export const CapacityPlaningFormComponent: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const appContext = useApplicationContext();
  const {
    data: goods,
    isLoading,
    error,
  } = useSWR("getArticlesWithoutGoodToProduce", async () => await appContext.getArticlesWithoutGoodToProduce(ARTICLES_NAME_TO_PRODUCE));

  if (isLoading || !goods) return <div>Wird geladen</div>

  if (error) return <div>{`Fehler beim Laden: ${(error as Error).toString()}`}</div>

  return (
      <PageSectionComponent
          title="Kapazitätsplanung"
          subtitle="Geben Sie die Fertigungsaufträge ein"
          endDecorator={<IconButton variant={"outlined"}><MoreHorizIcon /></IconButton>}
      >
        <FormGroupContainer>
          <Typography level={"title-md"}>Produkt P1</Typography>
          <FormGroupHeaderContainer>
            <Typography>Artikel</Typography>
            <Typography>Menge</Typography>
          </FormGroupHeaderContainer>
          <OrderRowContainer>
            {Array.from(Array(15).keys()).map((_row, index) =>
                <React.Fragment key={index}>
                  <Autocomplete
                      placeholder={"Artikel auswählen"}
                      //startDecorator={<NumbersOutlinedIcon />}
                      options={goods.map((g) => g.number)}
                  />
                  <Input
                      //startDecorator={<TakeoutDiningOutlinedIcon />}
                      placeholder={"Menge eingeben"}
                  />
                </React.Fragment>
            )}
          </OrderRowContainer>
        </FormGroupContainer>

        <FormGroupContainer>
          <Typography level={"title-md"}>Produkt P2</Typography>
          <FormGroupHeaderContainer>
            <Typography>Artikel</Typography>
            <Typography>Menge</Typography>
          </FormGroupHeaderContainer>
          <OrderRowContainer>
            {Array.from(Array(15).keys()).map((_row, index) =>
                <React.Fragment key={index}>
                  <Autocomplete
                      placeholder={"Artikel auswählen"}
                      //startDecorator={<NumbersOutlinedIcon />}
                      options={goods.map((g) => g.number)}
                  />
                  <Input
                      //startDecorator={<TakeoutDiningOutlinedIcon />}
                      placeholder={"Menge eingeben"}
                  />
                </React.Fragment>
            )}
          </OrderRowContainer>
        </FormGroupContainer>

        <FormGroupContainer>
          <Typography level={"title-md"}>Produkt P3</Typography>
          <FormGroupHeaderContainer>
            <Typography>Artikel</Typography>
            <Typography>Menge</Typography>
          </FormGroupHeaderContainer>
          <OrderRowContainer>
            {Array.from(Array(15).keys()).map((_row, index) =>
                <React.Fragment key={index}>
                  <Autocomplete
                      placeholder={"Artikel auswählen"}
                      //startDecorator={<NumbersOutlinedIcon />}
                      options={goods.map((g) => g.number)}
                  />
                  <Input
                      //startDecorator={<TakeoutDiningOutlinedIcon />}
                      placeholder={"Menge eingeben"}
                  />
                </React.Fragment>
            )}
          </OrderRowContainer>
        </FormGroupContainer>
        <Button
            disabled={isLoading}
            startDecorator={isLoading ? <CircularProgress size={"sm"} /> : null}
        >
          {isLoading ? "Ihre Kapazitätsplanung wird gespeichert..." : "Speichern"}
        </Button>
      </PageSectionComponent>
  );
};

const FormGroupContainer = styled(Card)`
    display: grid;
    grid-gap: var(--gap-2);
`;
const FormGroupHeaderContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--gap-1);
`;
const OrderRowContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--gap-2);
`;

