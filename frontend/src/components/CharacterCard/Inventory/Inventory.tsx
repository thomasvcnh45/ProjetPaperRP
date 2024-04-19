import { useState, useEffect } from 'react';
import { Button, Divider, Grid, GridColumn, Segment } from 'semantic-ui-react';
import './Inventory.scss';
import {
  RiArrowLeftLine,
  RiArrowLeftRightLine,
  RiArrowRightLine,
  RiDeleteBin2Line,
} from 'react-icons/ri';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../../../@types/character';
import InventoryModal from './InventoryModal';
import { AppDispatch, RootState } from '../../../state/store';
import {
  addItemToCharacter,
  fetchCharacterData,
  removeItemFromCharacter,
  toggleEquipItem,
} from '../../../state/character/characterSlice';

const iconSize = 18;

type InventoryProps = {
  items: Item[];
};

function Inventory({ items }: InventoryProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.character.data!);

  const [isBackpackOpen, setIsBackpackOpen] = useState(true);
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAddItem = (charId: number, itemId: number) => {
    dispatch(addItemToCharacter({ charId, itemId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDropItem = (charId: number, itemId: number) => {
    dispatch(removeItemFromCharacter({ charId, itemId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEquipItem = (charId: number, itemId: number) => {
    dispatch(toggleEquipItem({ charId, itemId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleBackpack = () => {
    if (windowWidth <= 450) {
      setIsBackpackOpen(!isBackpackOpen);
      if (isBackpackOpen) setIsEquipmentOpen(false); // Close the "Equipment" section if open
    }
  };

  const toggleEquipment = () => {
    if (windowWidth <= 450) {
      setIsEquipmentOpen(!isEquipmentOpen);
      if (isBackpackOpen) setIsBackpackOpen(false); // Close the "Backpack" section if open
    }
  };

  return (
    <Segment className="inventory">
      <Grid columns={2} stackable>
        <GridColumn>
          <div>
            <h3 onClick={toggleBackpack}>Sac à dos</h3>
            {isBackpackOpen && (
              <ul>
                {items
                  .filter((item) => !item.is_equipped)
                  .map((item) => (
                    <li className="item" key={item.id}>
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">{item.note}</div>
                      <Button
                        type="button"
                        onClick={() => handleDropItem(id, item.id)}
                      >
                        <RiDeleteBin2Line size={iconSize} />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleEquipItem(id, item.id)}
                      >
                        <RiArrowRightLine size={iconSize} />
                      </Button>
                    </li>
                  ))}
                <li>
                  <InventoryModal charId={id} onAddItem={handleAddItem} />
                </li>
              </ul>
            )}
          </div>
        </GridColumn>
        <GridColumn>
          <div>
            <h3 onClick={toggleEquipment}>Équipement</h3>
            {isEquipmentOpen && (
              <ul>
                {items
                  .filter((item) => item.is_equipped)
                  .map((item) => (
                    <li className="item" key={item.id}>
                      <Button
                        type="button"
                        onClick={() => handleEquipItem(id, item.id)}
                      >
                        <RiArrowLeftLine size={iconSize} />
                      </Button>
                      <div className="item-name">{item.name}</div>
                      <div className="item-description">{item.note}</div>
                      <Button
                        type="button"
                        onClick={() => handleDropItem(id, item.id)}
                      >
                        <RiDeleteBin2Line size={iconSize} />
                      </Button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </GridColumn>
      </Grid>

      <Divider vertical>
        <RiArrowLeftRightLine size={iconSize} />
      </Divider>
    </Segment>
  );
}

export default Inventory;
