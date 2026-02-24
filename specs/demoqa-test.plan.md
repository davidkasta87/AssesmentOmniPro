# DemoQA Test Plan

## Application Overview

Test plan for key navigation scenarios on DemoQA site.

## Test Scenarios

### 1. Navigation Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Caso 1: Navegar a la Página Principal

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Open browser and navigate to https://demoqa.com/
   - expect: The page should load without errors

2. Observe the page title and main menu icons or cards
   - expect: The title is visible
   - expect: Sections Elements, Forms, Alerts, Frame & Windows, Widgets, Interactions, Book Store Application are displayed

#### 1.2. Caso 2: Section Elements – Text Box

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Click on the Elements card
   - expect: Elements section opens

2. From the sidebar choose Text Box
   - expect: Text Box form is shown

3. Fill in the "Full Name" field with a valid text
   - expect: Name input contains supplied value

4. Enter a valid Email in the email field
   - expect: Email input contains supplied value

5. Click Submit
   - expect: Section displays confirmation with entered name and email

#### 1.3. Caso 3: Section Forms – Practice Form

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Click on Forms
   - expect: Forms section opens

2. Select Practice Form
   - expect: Practice Form page is displayed

3. Complete all required fields (first name, last name, email, gender, mobile, Date of Birth, Hobbies, Current Address, etc.)
   - expect: All required fields are filled

4. Click submit
   - expect: A modal or message confirms successful form submission

#### 1.4. Caso 4: Section Alerts, Frame & Windows

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Enter Alerts, Frame & Windows
   - expect: Alerts, Frame & Windows section opens

2. Try a button that shows a simple alert
   - expect: An alert appears

3. Accept the alert
   - expect: Alert is dismissed

4. Try a button that opens a new window/tab
   - expect: A new window or tab opens

#### 1.5. Caso 5: Section Widgets – Accordion

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Go to Widgets
   - expect: Widgets section opens

2. Select Accordion
   - expect: Accordion page is displayed

3. Click through different panels of the accordion
   - expect: Each panel expands correctly and shows text

#### 1.6. Caso 6: Section Interactions – Drag and Drop

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Go to Interactions
   - expect: Interactions section opens

2. Select Droppable
   - expect: Droppable page is displayed

3. Drag the movable element to the target area
   - expect: Element can be dragged to destination and feedback indicates success (text change or color change)

#### 1.7. Caso 7: Book Store Application – Búsqueda de Libros

**File:** `specs/demoqa-navigation.spec.ts`

**Steps:**

1. Click on Book Store Application
   - expect: Book Store section opens

2. Enter a search term (e.g., "Git") into the search interface
   - expect: Search field contains the term

3. Observe the results
   - expect: The listing includes titles containing or related to the term
