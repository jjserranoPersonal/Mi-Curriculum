"use client"

import { Mail, Phone, Calendar, Github, Linkedin, FileDown, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"

export default function CVPage() {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4")
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Colores profesionales
    const primaryBlue = [37, 99, 235]
    const lightBlue = [219, 234, 254]
    const darkGray = [55, 65, 81]
    const mediumGray = [107, 114, 128]

    // Función para verificar si necesitamos una nueva página
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    // Función para agregar secciones con estilo
    const addSectionHeader = (title: string) => {
      checkPageBreak(15)
      doc.setFillColor(...lightBlue)
      doc.rect(margin - 5, yPosition - 3, contentWidth + 10, 12, "F")
      doc.setFontSize(13)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...primaryBlue)
      doc.text(title, margin, yPosition + 5)
      yPosition += 15
      doc.setTextColor(0, 0, 0)
    }

    // Función para agregar texto con word wrap
    const addText = (
      text: string,
      fontSize = 10,
      style: "normal" | "bold" | "italic" = "normal",
      color: number[] = [0, 0, 0],
    ) => {
      doc.setFontSize(fontSize)
      doc.setFont("helvetica", style)
      doc.setTextColor(...color)
      const lines = doc.splitTextToSize(text, contentWidth)
      checkPageBreak(lines.length * (fontSize * 0.4) + 2)
      doc.text(lines, margin, yPosition)
      yPosition += lines.length * (fontSize * 0.4) + 2
    }

    // Función para agregar viñetas
    const addBullet = (text: string) => {
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      const lines = doc.splitTextToSize(text, contentWidth - 8)
      checkPageBreak(lines.length * 4 + 1)
      doc.circle(margin + 1, yPosition - 1, 0.8, "F")
      doc.text(lines, margin + 5, yPosition)
      yPosition += lines.length * 4 + 1
    }

    const loadProfileImage = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const canvas = document.createElement("canvas")
          const size = Math.min(img.width, img.height)
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext("2d")
          if (ctx) {
            // Dibujar círculo de recorte
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
            ctx.closePath()
            ctx.clip()

            // Dibujar la imagen centrada en el círculo
            const offsetX = (img.width - size) / 2
            const offsetY = (img.height - size) / 2
            ctx.drawImage(img, -offsetX, -offsetY, img.width, img.height)

            resolve(canvas.toDataURL("image/png"))
          } else {
            reject("Canvas context not available")
          }
        }
        img.onerror = () => reject("Image load failed")
        img.src = "/images/photo-2025-06-09-19-29-51.jpeg"
      })
    }

    try {
      // Cargar la imagen de perfil
      const profileImageData = await loadProfileImage()

      // === HEADER CON FOTO ===
      doc.setFillColor(...primaryBlue)
      doc.rect(0, 0, pageWidth, 55, "F")

      const photoSize = 28
      const photoX = pageWidth - margin - photoSize - 5
      const photoY = 13

      doc.setFillColor(255, 255, 255)
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, "F")

      doc.addImage(profileImageData, "PNG", photoX, photoY, photoSize, photoSize)

      // Información del header - ajustar ancho para no solapar con foto
      const headerTextWidth = pageWidth - 2 * margin - photoSize - 15

      doc.setFontSize(22)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(255, 255, 255)
      doc.text("JONNER JESÚS SERRANO MORA", margin, 20, { maxWidth: headerTextWidth })

      doc.setFontSize(14)
      doc.setFont("helvetica", "normal")
      doc.text("Ingeniero Electrónico", margin, 30, { maxWidth: headerTextWidth })

      doc.setFontSize(9)
      doc.text("Email: jjserrano.1991@gmail.com", margin, 38, { maxWidth: headerTextWidth })
      doc.text("Ubicación: Cúcuta, Colombia", margin, 43, { maxWidth: headerTextWidth })
      doc.text("Teléfono: +57 302 733 53 25", margin, 48, { maxWidth: headerTextWidth })
      doc.text("Fecha de Nacimiento: 21/09/1991 (34 años)", margin, 53, { maxWidth: headerTextWidth })
      doc.text("Teléfono: +58 412-023.96.21", margin, 58, { maxWidth: headerTextWidth })

      yPosition = 62

      doc.setTextColor(0, 0, 0)

      // === PERFIL PROFESIONAL ===
      addSectionHeader("PERFIL PROFESIONAL")
      addText(
        "Profesional proactivo, dinámico y organizado, con habilidades avanzadas en gestión de proyectos, análisis y resolución de problemas. Destacado por su capacidad de adaptación a nuevas tecnologías, comunicación efectiva y excelentes relaciones interpersonales.+",
        9,
      )
      yPosition += 2

      addText(
        "Mi especialidad va más allá de la gestión de tareas; mi valor radica en mi capacidad de conectar la estrategia de producto con la viabilidad técnica:",
        9,
        "bold",
      )
      yPosition += 3

      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      addText("• Estrategia y Roadmap:", 9, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        "  Experto en la identificación de oportunidades de mercado y en la creación de planes de producto centrados en el valor incremental y el crecimiento sostenido.",
        9,
      )

      doc.setFont("helvetica", "bold")
      addText("• Conocimiento Técnico Profundo:", 9, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        "  Aporto un importante background de desarrollo backend con Python, PHP y SQL, lo que me permite tomar decisiones de arquitectura informadas y colaborar de manera efectiva con los equipos de ingeniería.",
        9,
      )

      doc.setFont("helvetica", "bold")
      addText("• Liderazgo Ágil:", 9, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        '  Dirección de equipos multidisciplinarios, optimizando procesos y elevando el rendimiento organizacional a través de Scrum, Product Owner o Líder de Proyecto que "habla el idioma" de los desarrolladores centrado en el crecimiento estratégico.',
        9,
      )

      doc.setFont("helvetica", "bold")
      addText("• Historias de Usuario de Alto Valor:", 9, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        "  Capacidad de generar historias de usuario con alto conocimiento técnico y valor agregado, incluyendo mockups completos de diseño UI/UX utilizando herramientas como Vercel (V0Dev) y Stitch, facilitando la comunicación entre negocio y desarrollo.",
        9,
      )
      yPosition += 3

      addBullet(
        "Experiencia en metodologías ágiles, especialmente Scrum, con conocimientos en la gestión de productos, creación y priorización del product backlog y facilitación de ceremonias ágiles.",
      )
      addBullet(
        "Uso de inteligencia artificial, utilizando herramientas como Cursor, ChatGPT, Gemini, DeepSeek, Bolt, Vercel (V0Dev), Stitch y NotebookIm agilizando tiempos de entrega",
      )
      addBullet("Formación en programación y gestión de bases de datos.")
      addBullet("Conocimientos avanzados en facturación electrónica.")
      addBullet(
        "Habilidad para ensamblaje y mantenimiento de hardware, incluyendo diagnóstico y reparación de equipos.",
      )
      addBullet(
        "Especialista en soporte técnico e integración con equipos fiscales y estándar, integración con servicios web Rest y Soap",
      )
      addBullet(
        "Capacidad para trabajar bajo presión y en equipos multidisciplinarios, asegurando el cumplimiento de objetivos en entornos dinámicos.",
      )
      yPosition += 4

      // === EXPERIENCIA LABORAL ===
      addSectionHeader("EXPERIENCIA LABORAL")

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      addText("Product Owner", 11, "bold")
      doc.setFontSize(10)
      doc.setTextColor(...primaryBlue)
      doc.text("THE FACTORY HKA C.A. Colombia", margin, yPosition)
      doc.setTextColor(...mediumGray)
      doc.text("07/2021 - Presente", pageWidth - margin - 45, yPosition)
      yPosition += 6
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(9)
      doc.setFont("helvetica", "italic")
      addText("Proveedor tecnológico autorizado por la DIAN de facturación electrónica", 9, "italic", mediumGray)
      yPosition += 1
      addBullet("Desarrollo de nuevos productos aplicando Scrum para mejorar la eficiencia del equipo.")
      addBullet("Priorización y gestión del Product Backlog, alineado con las necesidades del negocio.")
      addBullet(
        "Colaboración con scrum master y equipos de desarrollo para entregar incrementos de valor en cada sprint.",
      )
      addBullet("Facilitación de ceremonias Scrum: Refinamientos, Planificaciones, Revisiones y Retrospectivas.")
      addBullet("Coordinación con stakeholders para definir la visión del producto y asegurar alineación estratégica.")
      yPosition += 4

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      addText("Líder de integración con Servicios Web", 11, "bold")
      doc.setFontSize(10)
      doc.setTextColor(...primaryBlue)
      doc.text("THE FACTORY HKA C.A. Colombia", margin, yPosition)
      doc.setTextColor(...mediumGray)
      doc.text("01/2021 - 07/2021", pageWidth - margin - 45, yPosition)
      yPosition += 7
      doc.setTextColor(0, 0, 0)
      addBullet(
        "Líder del equipo de integración, encargado del soporte y consultorías pre y post-venta de los equipos fiscales comercializados y desarrollados por la empresa y facturación electrónica en Colombia.",
      )
      addBullet(
        "Asesoría técnica especializada para lograr la integración efectiva de los sistemas de software contables (ERP).",
      )
      addBullet(
        "Desarrollo de SDK's (Demos y documentación técnica para la integración con servicios web SOAP y Api-REST) para lograr la integración en diferentes tecnologías/ambientes como .NET, Java, Python, PHP, entre otros.",
      )
      yPosition += 4

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      addText("Especialista de Soporte e Integración", 11, "bold")
      doc.setFontSize(10)
      doc.setTextColor(...primaryBlue)
      doc.text("THE FACTORY HKA C.A. Venezuela", margin, yPosition)
      doc.setTextColor(...mediumGray)
      doc.text("07/2015 - 12/2020", pageWidth - margin - 45, yPosition)
      yPosition += 7
      doc.setTextColor(0, 0, 0)
      addBullet("Soporte pre y post-venta de los equipos fiscales comercializados y desarrollados por la empresa.")
      addBullet(
        "Asesoría técnica especializada para lograr la integración efectiva de los sistemas administrativos desarrollados por las casas de software con los equipos fiscales y estándar.",
      )
      yPosition += 4

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      addText("Pasantía Profesional", 11, "bold")
      doc.setFontSize(10)
      doc.setTextColor(...primaryBlue)
      doc.text("Trabajo de Aplicación Profesional (TAP)", margin, yPosition)
      doc.setTextColor(...mediumGray)
      doc.text("02/2014 - 05/2014", pageWidth - margin - 45, yPosition)
      yPosition += 7
      doc.setTextColor(0, 0, 0)
      addText(
        'Proyecto: Rehabilitación del sistema de excitación de la unidad generadora Nº 2 de la Central Hidroeléctrica Leonardo Ruiz Pineda "San Agatón".',
        9,
      )
      yPosition += 5

      // === FORMACIÓN ACADÉMICA ===
      addSectionHeader("FORMACIÓN ACADÉMICA")
      doc.setFont("helvetica", "bold")
      addText("Ingeniero Electrónico", 11, "bold")
      doc.setTextColor(...primaryBlue)
      addText("Universidad Nacional Experimental del Táchira (UNET)", 10, "normal", primaryBlue)
      doc.setTextColor(0, 0, 0)
      addText("Egreso: Junio de 2015 | Índice académico: 7.38 de máximo 9,00", 9)
      yPosition += 3

      doc.setFont("helvetica", "bold")
      addText("Bachiller en Ciencias", 11, "bold")
      doc.setTextColor(...primaryBlue)
      addText(
        'Escuela Técnica Agropecuaria Robinsoniana Zamorana "Isaías Medina Angarita" (ETARZIMA)',
        10,
        "normal",
        primaryBlue,
      )
      doc.setTextColor(0, 0, 0)
      addText("Egreso: 2008", 9)
      yPosition += 5

      // === CURSOS Y SEMINARIOS ===
      addSectionHeader("CURSOS Y SEMINARIOS")
      const courses = [
        { name: "Python sin fronteras: HTML, CSS, Flask y MySQL - Udemy", year: "2024 (25 horas)" },
        { name: "SCRUM Developer Certified (SDC) - GLOBALDESK, C.A.", year: "2018 (16 horas)" },
        { name: "Curso Programación Android - Instituto Benllissoft", year: "2016 (24 horas)" },
        { name: "Curso Visual C# 2015 - Instituto GALA", year: "2016 (36 horas)" },
        { name: "Curso Configuración e Instalación de Redes (CISCO), Modulo I - UNET", year: "2013 (70 horas)" },
        { name: "Curso Administración de Redes (Linux), Básico - UNET", year: "2013 (60 horas)" },
        { name: "GNU/LINUX, Básico - UNET", year: "2012 (60 horas)" },
        { name: "Seminario Desarrollo de Aplicaciones Android - UNET", year: "2011 (3 horas)" },
      ]

      courses.forEach((course) => {
        checkPageBreak(8)
        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        const courseLines = doc.splitTextToSize(course.name, contentWidth - 50)
        doc.text(courseLines, margin, yPosition)
        doc.setTextColor(...mediumGray)
        doc.text(course.year, pageWidth - margin - 38, yPosition)
        doc.setTextColor(0, 0, 0)
        yPosition += Math.max(courseLines.length * 4, 5)
      })
      yPosition += 3

      // === HABILIDADES Y CONOCIMIENTOS ===
      addSectionHeader("HABILIDADES Y CONOCIMIENTOS")

      doc.setFont("helvetica", "bold")
      addText("General:", 10, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        "Scrum, Metodologías Ágiles, Gestión de producto, Facturación electrónica, Integración con servicios Web y Soap",
        9,
      )
      yPosition += 2

      doc.setFont("helvetica", "bold")
      addText("Lenguajes y Tecnologías:", 10, "bold")
      doc.setFont("helvetica", "normal")
      addText("Python (FastApi), PHP, SQL, MySQL, SQLAlchemy, HTML, CSS, Git, Soap, Rest", 9)
      yPosition += 2

      doc.setFont("helvetica", "bold")
      addText("Herramientas:", 10, "bold")
      doc.setFont("helvetica", "normal")
      addText(
        "Visual Code, Cursor, Postman, SoapUI, Microsoft Azure, Google Colab, DBeaver, MySQL Workbench, SQL Server Management Studio, GitHub, GitLab",
        9,
      )
      yPosition += 2

      doc.setFont("helvetica", "bold")
      addText("Otras Competencias:", 10, "bold")
      doc.setFont("helvetica", "normal")
      addText("Servicios Web Rest, Servicios Web Soap, Microsoft Office", 9)
      yPosition += 5

      // === IDIOMAS ===
      addSectionHeader("IDIOMAS")
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.text("Español:", margin, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text("Natal", margin + 25, yPosition)
      yPosition += 6
      doc.setFont("helvetica", "bold")
      doc.text("Inglés:", margin, yPosition)
      doc.setFont("helvetica", "normal")
      doc.text("Básico (Escrito y hablado)", margin + 25, yPosition)
      yPosition += 8

      // === ENLACES PROFESIONALES ===
      addSectionHeader("ENLACES PROFESIONALES")
      doc.setTextColor(...primaryBlue)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(9)
      doc.textWithLink("GitHub: https://github.com/jjserranoPersonal", margin, yPosition, {
        url: "https://github.com/jjserranoPersonal",
      })
      yPosition += 6
      doc.textWithLink("LinkedIn: https://www.linkedin.com/in/jonner-serrano-3a6aa986/", margin, yPosition, {
        url: "https://www.linkedin.com/in/jonner-serrano-3a6aa986/",
      })
      yPosition += 6
      doc.textWithLink(
        "Certificaciones: https://drive.google.com/drive/u/0/folders/1g2gvsuCKBXKx-BlrGD_JX2zIQlc5pmny",
        margin,
        yPosition,
        { url: "https://drive.google.com/drive/u/0/folders/1g2gvsuCKBXKx-BlrGD_JX2zIQlc5pmny" },
      )

      doc.save("CV_Jonner_Serrano_Mora.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-[#2563eb] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-white flex-shrink-0">
              <img
                src="/images/photo-2025-06-09-19-29-51.jpeg"
                alt="Jonner Jesús Serrano Mora"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Jonner Jesús Serrano Mora</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6">Ingeniero Electrónico</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail className="w-4 h-4" />
                  <span>jjserrano.1991@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4" />
                  <span>+58 412-023.96.21</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="w-4 h-4" />
                  <span>+57 302 733 53 25</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4" />
                  <span>21/09/1991 (34 años)</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span>Cúcuta, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Perfil Profesional */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">💼</span> Perfil Profesional
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Profesional proactivo, dinámico y organizado, con habilidades avanzadas en gestión de proyectos, análisis
              y resolución de problemas. Destacado por su capacidad de adaptación a nuevas tecnologías, comunicación
              efectiva y excelentes relaciones interpersonales.
            </p>

            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="font-semibold mb-3 text-foreground">
                Mi especialidad va más allá de la gestión de tareas; mi valor radica en mi capacidad de conectar la
                estrategia de producto con la viabilidad técnica:
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <p className="font-semibold text-foreground">Estrategia y Roadmap:</p>
                    <p className="text-sm text-muted-foreground">
                      Experto en la identificación de oportunidades de mercado y en la creación de planes de producto
                      centrados en el valor incremental y el crecimiento sostenido.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">⚙️</span>
                  <div>
                    <p className="font-semibold text-foreground">Conocimiento Técnico Profundo:</p>
                    <p className="text-sm text-muted-foreground">
                      Aporto un importante background de desarrollo backend con Python, PHP y SQL, lo que me permite
                      tomar decisiones de arquitectura informadas y colaborar de manera efectiva con los equipos de
                      ingeniería.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">🚀</span>
                  <div>
                    <p className="font-semibold text-foreground">Liderazgo Ágil:</p>
                    <p className="text-sm text-muted-foreground">
                      Dirección de equipos multidisciplinarios, optimizando procesos y elevando el rendimiento
                      organizacional a través de Scrum, Product Owner o Líder de Proyecto que "habla el idioma" de los
                      desarrolladores centrado en el crecimiento estratégico.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">📊</span>
                  <div>
                    <p className="font-semibold text-foreground">Historias de Usuario de Alto Valor:</p>
                    <p className="text-sm text-muted-foreground">
                      Capacidad de generar historias de usuario con alto conocimiento técnico y valor agregado,
                      incluyendo mockups completos de diseño UI/UX utilizando herramientas como Vercel (V0Dev) y Stitch,
                      facilitando la comunicación entre negocio y desarrollo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">
                  Experiencia en metodologías ágiles, especialmente Scrum, con conocimientos en la gestión de productos,
                  creación y priorización del product backlog y facilitación de ceremonias ágiles.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">
                  Uso de inteligencia artificial, utilizando herramientas como Cursor, ChatGPT, Gemini, DeepSeek, Bolt,
                  Vercel (V0Dev), Stitch y NotebookIm agilizando tiempos de entrega
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">Formación en programación y gestión de bases de datos.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">Conocimientos avanzados en facturación electrónica.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">
                  Habilidad para ensamblaje y mantenimiento de hardware, incluyendo diagnóstico y reparación de equipos.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">
                  Especialista en soporte técnico e integración con equipos fiscales y estándar, integración con
                  servicios web Rest y Soap
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">●</span>
                <p className="text-sm">
                  Capacidad para trabajar bajo presión y en equipos multidisciplinarios, asegurando el cumplimiento de
                  objetivos en entornos dinámicos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experiencia Laboral */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">💼</span> Experiencia Laboral
            </h2>

            <div className="space-y-8">
              {/* Product Owner */}
              <div className="border-l-4 border-primary pl-6">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold">Product Owner</h3>
                  <span className="text-sm text-muted-foreground">07/2021 - Presente</span>
                </div>
                <p className="text-blue-600 font-semibold mb-2">THE FACTORY HKA C.A. Colombia</p>
                <p className="text-sm italic text-muted-foreground mb-3">
                  Proveedor tecnológico autorizado por la DIAN de facturación electrónica
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>Desarrollo de nuevos productos aplicando Scrum para mejorar la eficiencia del equipo.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>Priorización y gestión del Product Backlog, alineado con las necesidades del negocio.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Colaboración con scrum master y equipos de desarrollo para entregar incrementos de valor en cada
                      sprint.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Facilitación de ceremonias Scrum: Refinamientos, Planificaciones, Revisiones y Retrospectivas.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Coordinación con stakeholders para definir la visión del producto y asegurar alineación
                      estratégica.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Líder de integración */}
              <div className="border-l-4 border-blue-400 pl-6">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold">Líder de integración con Servicios Web</h3>
                  <span className="text-sm text-muted-foreground">01/2021 - 07/2021</span>
                </div>
                <p className="text-blue-600 font-semibold mb-3">THE FACTORY HKA C.A. Colombia</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Líder del equipo de integración, encargado del soporte y consultorías pre y post-venta de los
                      equipos fiscales comercializados y desarrollados por la empresa y facturación electrónica en
                      Colombia.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Asesoría técnica especializada para lograr la integración efectiva de los sistemas de software
                      contables (ERP).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Desarrollo de SDK's (Demos y documentación técnica para la integración con servicios web SOAP y
                      Api-REST) para lograr la integración en diferentes tecnologías/ambientes como .NET, Java, Python,
                      PHP, entre otros.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Especialista de Soporte */}
              <div className="border-l-4 border-blue-300 pl-6">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold">Especialista de Soporte e Integración</h3>
                  <span className="text-sm text-muted-foreground">07/2015 - 12/2020</span>
                </div>
                <p className="text-blue-600 font-semibold mb-3">THE FACTORY HKA C.A. Venezuela</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Soporte pre y post-venta de los equipos fiscales comercializados y desarrollados por la empresa.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-muted-foreground flex-shrink-0">●</span>
                    <span>
                      Asesoría técnica especializada para lograr la integración efectiva de los sistemas administrativos
                      desarrollados por las casas de software con los equipos fiscales y estándar.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Pasantía */}
              <div className="border-l-4 border-blue-200 pl-6">
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold">Pasantía Profesional</h3>
                  <span className="text-sm text-muted-foreground">02/2014 - 05/2014</span>
                </div>
                <p className="text-blue-600 font-semibold mb-3">Trabajo de Aplicación Profesional (TAP)</p>
                <p className="text-sm">
                  Proyecto: Rehabilitación del sistema de excitación de la unidad generadora Nº 2 de la Central
                  Hidroeléctrica Leonardo Ruiz Pineda "San Agatón".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formación Académica */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🎓</span> Formación Académica
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Ingeniero Electrónico</h3>
                <p className="text-blue-600 font-semibold mb-2">Universidad Nacional Experimental del Táchira (UNET)</p>
                <p className="text-sm text-muted-foreground">Egreso: Junio de 2015</p>
                <p className="text-sm text-muted-foreground">Índice académico: 7.38 de máximo 9,00</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-1">Bachiller en Ciencias</h3>
                <p className="text-blue-600 font-semibold mb-2">
                  Escuela Técnica Agropecuaria Robinsoniana Zamorana "Isaías Medina Angarita" (ETARZIMA)
                </p>
                <p className="text-sm text-muted-foreground">Egreso: 2008</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cursos y Seminarios */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🎓</span> Cursos y Seminarios
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">Python sin fronteras: HTML, CSS, Flask y MySQL - Udemy</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2024 (25 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">SCRUM Developer Certified (SDC) - GLOBALDESK, C.A.</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2018 (16 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">Curso Programación Android - Instituto Benllissoft</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2016 (24 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">Curso Visual C# 2015 - Instituto GALA</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2016 (36 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">Curso Configuración e Instalación de Redes (CISCO), Modulo I - UNET</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2013 (70 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">Curso Administración de Redes (Linux), Básico - UNET</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2013 (60 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2 border-b">
                <p className="text-sm flex-1">GNU/LINUX, Básico - UNET</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2012 (60 horas)</p>
              </div>
              <div className="flex justify-between items-start gap-4 py-2">
                <p className="text-sm flex-1">Seminario Desarrollo de Aplicaciones Android - UNET</p>
                <p className="text-sm text-muted-foreground whitespace-nowrap">2011 (3 horas)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades y Conocimientos */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">💻</span> Habilidades y Conocimientos
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-3">General</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Scrum
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Metodologías Ágiles
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Gestión de producto
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Facturación electrónica
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Integración con servicios Web y Soap
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Lenguajes y Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Python (FastApi)
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Php
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    SQL
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    MySQL
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    SQLAlchemy
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    HTML
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    CSS
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Git
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Soap
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Rest
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Herramientas</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Visual Code
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Cursor
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Postman
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    SoapUI
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Microsoft Azure
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Google Colab
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    DBeaver
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    MySQL Workbench
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    SQL Server Management Studio
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    GitHub
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    GitLab
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Otras Competencias</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Servicios Web Rest
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Servicios Web Soap
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    Microsoft Office
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🌐</span> Idiomas
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🇪🇸</div>
                <div>
                  <p className="font-bold">Español</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Natal
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-3xl">🇬🇧</div>
                <div>
                  <p className="font-bold">Inglés</p>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    Básico (Escrito y hablado)
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces Profesionales */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🔗</span> Enlaces Profesionales
            </h2>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" className="gap-2">
                <a href="https://github.com/jjserranoPersonal" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>

              <Button asChild variant="default" className="gap-2">
                <a
                  href="https://www.linkedin.com/in/jonner-serrano-3a6aa986/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>

              <Button asChild variant="default" className="gap-2">
                <a
                  href="https://drive.google.com/drive/u/0/folders/1g2gvsuCKBXKx-BlrGD_JX2zIQlc5pmny"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-5 h-5" />
                  Certificaciones
                </a>
              </Button>

              <Button variant="default" className="gap-2" onClick={handleDownloadPDF}>
                <FileDown className="w-5 h-5" />
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Jonner Jesús Serrano Mora. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
