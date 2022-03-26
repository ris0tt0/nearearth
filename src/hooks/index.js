import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommands } from '../commands';

export const useCommands = () => {
  const dispatch = useDispatch();
  //   const commandsRef = useRef({});
  const [commands, setCommands] = useState({});

  useEffect(() => {
    const cmds = createCommands(dispatch);

    setCommands(cmds);
  }, [dispatch]);

  return commands;
};
