import { Button, Form, TextArea } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

type BackgroundProps = {
  background: string;
  onBackgroundChange: (newBackground: string) => void;
};

function Background({
  background: initialBackground,
  onBackgroundChange,
}: BackgroundProps) {
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setBackground(initialBackground);
  }, [initialBackground]);

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBackground(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page
    onBackgroundChange(background); // Appelle la fonction de mise à jour du background
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        placeholder="Renseignez ici l'histoire de votre personnage"
        style={{ minHeight: 300 }}
        value={background}
        onChange={handleBackgroundChange}
      />
      <Button type="submit" style={{ marginTop: '20px' }}>
        Enregistrer
      </Button>
    </Form>
  );
}

export default Background;
