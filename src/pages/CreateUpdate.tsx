import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColorField } from "../components/Form/ColorField";
import { Layout } from "../components/Layout";
import { ThemeDisplayEditable } from "../components/ThemeDisplay/Editable";
import { NewTheme, Theme, useTheme } from "../hooks/useTheme";

export interface FormValues {
  name: string
  backgroundColor: string
  primaryTextColor: string
  secondaryTextColor: string
  accentColor: string
}

export function CreateUpdate(): JSX.Element {
  const [selectedThemeId, setSelectedThemeId] = useState<number>(0);

  const { addTheme, getTheme, editTheme } = useTheme();
  const { themeId } = useParams();

  const schema = yup.object().shape({
    name: yup.string().required(),
    backgroundColor: yup.string().required(),
    primaryTextColor: yup.string().required(),
    secondaryTextColor: yup.string().required(),
    accentColor: yup.string().required(),
  });

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      backgroundColor: "#030D16",
      primaryTextColor: "#FFFFFF",
      secondaryTextColor: "#624B7E",
      accentColor: "#7C3AED",
    },
  });

  const {
    handleSubmit, register, reset, control, formState: {
      isDirty, isValid,
    },
  } = methods;

  useEffect(() => {
    if (themeId) {
      const theme = getTheme(+themeId);
      if (theme) {
        reset({
          name: theme.name,
          backgroundColor: theme["background-color"],
          primaryTextColor: theme["primary-text-color"],
          secondaryTextColor: theme["secondary-text-color"],
          accentColor: theme["accent-color"],
        });
        setSelectedThemeId(theme.id);
      }
    }
  }, [getTheme, reset, themeId]);

  const navigate = useNavigate();

  const createTheme = (values: FormValues): void => {
    const newTheme: NewTheme = {
      name: values.name,
      "background-color": values.backgroundColor,
      "primary-text-color": values.primaryTextColor,
      "secondary-text-color": values.secondaryTextColor,
      "accent-color": values.accentColor,
    };
    addTheme(newTheme);
    navigate("/", { replace: true });
  };

  const updateTheme = (values: FormValues): void => {
    const theme: Theme = {
      id: selectedThemeId,
      name: values.name,
      "background-color": values.backgroundColor,
      "primary-text-color": values.primaryTextColor,
      "secondary-text-color": values.secondaryTextColor,
      "accent-color": values.accentColor,
    };
    editTheme(theme);
    navigate("/", { replace: true });
  };

  return (
    <Layout>
      <div className="flex gap-10">
        <div>
          <ThemeDisplayEditable control={control} />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-6xl">Create your theme</h1>
          <p className="text-base">
            Pick colors may be a challege, but don&#39;t worry,
            you can {" "}
            <a
              href="https://coolors.co/palettes/trending"
              target="_blank"
              rel="noreferrer"
              className="text-primary-600">
              click here
            </a> {" "}
            to see some pallete colors and try here.
          </p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(themeId ? updateTheme : createTheme)}>
              <h2 className="text-lg font-bold mb-4">Select colors</h2>
              <div className="flex gap-8 mb-8">
                <ColorField {...register("backgroundColor")} label="Background" />
                <ColorField {...register("primaryTextColor")} label="Primary Text" />
                <ColorField {...register("secondaryTextColor")} label="Secondary Text" />
                <ColorField {...register("accentColor")} label="Accent" />
              </div>

              <div className="mb-8">
                <label htmlFor="name" className="flex flex-col gap-2">
                  <span className="text-lg font-bold">Name</span>
                  <input
                    type="text"
                    id="name"
                    className={`
                    bg-secondary-100 h-10 px-4 rounded-md focus:ring-2 ring-offset-1 ring-primary-600 outline-none
                  `}
                    placeholder="Type your theme name..."
                    autoComplete="off"
                    {...register("name")}
                  />
                </label>
              </div>

              <button
                className={`btn ${!isDirty || !isValid ? "opacity-60" : ""}`}
                type="submit"
                disabled={!isDirty || !isValid}>{themeId ? "Update" : "create"}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Layout>
  );
}
